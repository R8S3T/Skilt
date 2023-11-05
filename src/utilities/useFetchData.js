import { useState, useEffect } from "react";
import { getDatabase } from "../utilities/database";
import { isEqual } from "lodash";

const useFetchData = (query, params) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const db = getDatabase();
                let quizzes = [];

                // Wrap the transaction in a new Promise to handle transaction errors.
                await new Promise((transactionResolve, transactionReject) => {
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

                                        await new Promise((resolve, reject) => {
                                            tx.executeSql(
                                                optionsQuery,
                                                optionsParams,
                                                (_, { rows: { _array } }) => {
                                                    quiz.options = _array.map(opt => opt.OptionText);
                                                    resolve();
                                                },
                                                (_, err) => {
                                                    console.error('Option fetch error:', err);
                                                    reject(err);
                                                }
                                            );
                                        }).catch(optionError => {
                                            console.error('Option promise error:', optionError);
                                            // Handle option query errors here if needed
                                        });
                                    }
                                }

                                if (!isEqual(data, quizzes)) {
                                    setData(quizzes);
                                }

                                transactionResolve(); // Resolve the transaction promise here
                            },
                            (_, transactionError) => {
                                console.error('Transaction error:', transactionError);
                                transactionReject(transactionError); // Reject the transaction promise here
                            }
                        );
                    });
                }).catch(transactionError => {
                    // Handle the transaction error here
                    console.error('Transaction promise error:', transactionError);
                    setError(transactionError);
                });

            } catch (err) {
                console.error('Fetch data error:', err);
                setError(err);
            }
        };

        fetchData();
    }, [query, params]);

    return { data, error };
};

export default useFetchData;
