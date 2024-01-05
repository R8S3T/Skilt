import { useEffect, useState } from "react";
import { fetchData } from "./fetchData";

const useSubchapterData = (chapterId) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadSubchapterData = async () => {
            try {
                console.log(`Fetching data for chapterId: ${chapterId}`); // Log the chapterId being used
                const subchapterQuery = `
                    SELECT SubchapterContent.ContentId AS scContentId, ContentData, q.QuizId, q.ContentId AS quizContentId, q.Question
                    FROM SubchapterContent
                    LEFT JOIN Quiz q ON SubchapterContent.ContentId = q.ContentId
                    WHERE SubchapterId = ?
                    ORDER BY SubchapterContent.ContentId ASC
                `;
                const subchapterParams = [chapterId];
                console.log(`Executing query: ${subchapterQuery}`); // Log the query
                console.log(`With parameters: ${subchapterParams}`); // Log the parameters

                const subchapterData = await fetchData(subchapterQuery, subchapterParams);
                console.log(`Query result: `, subchapterData); 

                for (const item of subchapterData) {
                    if (item.QuizId) {
                        const optionsQuery = `
                            SELECT OptionText
                            FROM MultipleChoiceOptions
                            WHERE QuizId = ?
                            ORDER BY OptionId ASC
                        `;
                        const optionsParams = [item.QuizId];
                        console.log(`Fetching options for QuizId: ${item.QuizId}`); // Log the QuizId being used
                        item.options = await fetchData(optionsQuery, optionsParams);
                        console.log(`Options for QuizId ${item.QuizId}: `, item.options); // Log the options
                    }
                }
                setData(subchapterData);
            } catch (e) {
                setError(e);
            } finally {
                setLoading(false);
            }
        };

        loadSubchapterData();
    }, [chapterId]);

    return { data, error, loading };
}

export default useSubchapterData;