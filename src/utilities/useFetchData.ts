import { useState, useEffect } from "react";
import { getDatabase } from "./database";
import { isEqual } from "lodash";

export interface Quiz {
    Type: string;
    QuizId: number;
    Question: string;
    Answer: string;
    options?: string[];
}

function useFetchData(query: string, parameters: any[]): { data: Quiz[]; error: any } {
    const [data, setData] = useState<Quiz[]>([]);
    const [error, setError] = useState<Error | null>(null);

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
                                    if (quiz.Type === 'multiple_choice') {
                                        const optionsQuery = `
                                            SELECT OptionText
                                            FROM MultipleChoiceOptions
                                            WHERE QuizId = ?
                                            ORDER BY OptionId ASC
                                        `;
                                        const optionsParams = [quiz.QuizId];

                                        await new Promise<void>((resolve, reject) => {
                                            tx.executeSql(
                                                optionsQuery,
                                                optionsParams,
                                                (_, result: any) => {
                                                    const _array = result.rows._array;
                                                    quiz.options = _array.map((opt: any) => opt.OptionText);
                                                    resolve();
                                                },

                                                (_, err: any) => { // Temporarily use 'any' if the exact error type is unknown
                                                    console.error('Option fetch error:', err.message);
                                                    reject(err);
                                                    return true; // Indicate to roll back the transaction
                                                }
                                            );
                                        }).catch(optionError => {
                                            console.error('Option promise error:', optionError);
                                        });
                                    } else if (quiz.Type === 'cloze_test') {
                                        const clozeOptionsQuery = `
                                            SELECT OptionText
                                            FROM ClozeTest
                                            WHERE QuizId = ?
                                            ORDER BY SortOrder ASC
                                        `;
                                        const clozeOptionsParams = [quiz.QuizId];

                                        await new Promise<void>((resolve, reject) => {
                                            tx.executeSql(
                                                clozeOptionsQuery,
                                                clozeOptionsParams,
                                                (_, result) => {
                                                    const optionsArray = result.rows._array;
                                                    quiz.options = optionsArray.map(opt => opt.OptionText);
                                                    resolve();
                                                },
                                                (_, err) => {
                                                    console.error('Cloze test options fetch error:', err.message);
                                                    reject(err);
                                                    return true; // Indicate to roll back the transaction
                                                }
                                            );
                                        }).catch(clozeOptionsError => {
                                            console.error('Cloze test options promise error:', clozeOptionsError);
                                        });
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
            }
        };

        fetchData();
    }, [query, ...parameters]);

    return { data, error };
};

export default useFetchData;
