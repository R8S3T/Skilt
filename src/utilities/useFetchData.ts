import { useState, useEffect } from "react";
import { getDatabase } from "./database";
import { isEqual } from "lodash";

export interface Quiz {
    Type: string;
    QuizId: number;
    Question: string;
    Answer: string;
    options?: string[];
    correctAnswers?: string[];
}

function useFetchData(query: string, parameters: any[]): { data: Quiz[]; error: any } {
    const [data, setData] = useState<Quiz[]>([]);
    const [error, setError] = useState<Error | null>(null);

    // Function to fetch options based on the quiz type
    const fetchOptions = async (tx, quiz) => {
        const optionsQuery = quiz.Type === 'multiple_choice'
            ? `SELECT OptionText FROM MultipleChoiceOptions WHERE QuizId = ? ORDER BY OptionId ASC`
            : `SELECT OptionText FROM ClozeTest WHERE QuizId = ? ORDER BY SortOrder ASC`;

        const optionsParams = [quiz.QuizId];

        return new Promise((resolve, reject) => {
            tx.executeSql(
                optionsQuery,
                optionsParams,
                (_, result) => {
                    const options = result.rows._array.map(opt => opt.OptionText);
                    resolve(options);
                },
                (_, err) => {
                    console.error(`${quiz.Type} options fetch error:`, err.message);
                    reject(err);
                    return true; // Returning true to rollback might be necessary depending on your error handling strategy
                }
            );
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const db = getDatabase();
                let quizzes = [];

                await new Promise<void>((transactionResolve, transactionReject) => {
                    db.transaction(tx => {
                        tx.executeSql(
                            query,
                            parameters,
                            async (_, { rows: { _array } }) => {
                                quizzes = _array;

                                for (const quiz of quizzes) {
                                    // Fetch options for the quiz
                                    try {
                                        const options = await fetchOptions(tx, quiz);
                                        quiz.options = options;

                                        if (quiz.Type === 'cloze_test') {
                                            quiz.correctAnswers = quiz.Answer 
                                                ? quiz.Answer.split(",").map((answer: string) => answer.trim())
                                                : [];
                                        }
                                    } catch (optionError) {
                                        console.error('Option fetch error:', optionError);
                                        // Consider how to handle this error. For example, you might want to:
                                        // - set a flag on the quiz to indicate failed option fetch
                                        // - handle it in a way that doesn't interrupt the rest of the processing
                                    }
                                }

                                if (!isEqual(data, quizzes)) {
                                    setData(quizzes);
                                }

                                transactionResolve();
                            },
                            (_, transactionError) => {
                                console.error('Transaction error:', transactionError);
                                transactionReject(transactionError);
                                return true;
                            }
                        );
                    });
                }).catch(transactionError => {
                    console.error('Transaction promise error:', transactionError);
                    setError(transactionError);
                });

            } catch (err) {
                console.error('Fetch data error:', err);
                setError(err instanceof Error ? err : new Error('An error occurred while fetching data'));
            }
        };

        fetchData();
    }, [query, ...parameters]);

    return { data, error };
}

export default useFetchData;

