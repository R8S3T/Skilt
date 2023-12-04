import { useState, useEffect } from "react";
import { getDatabase } from "./database";
import { isEqual } from "lodash";

const useFetchData = (query: string, params: any[]) => {
    interface Quiz {
        Type: string;
        QuizId: number;
        options?: string[];
    }
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
                            params,
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
    }, [query, params]);

    return { data, error };
};

export default useFetchData;
