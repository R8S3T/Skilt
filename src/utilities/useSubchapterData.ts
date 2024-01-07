import { useEffect, useState } from "react";
import { fetchData } from "./fetchData";

const useSubchapterData = (chapterId) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadSubchapterData = async () => {
            try {
                const subchapterQuery = `
                    SELECT SubchapterContent.ContentId AS scContentId, ContentData, q.QuizId, q.ContentId AS quizContentId, q.Question
                    FROM SubchapterContent
                    LEFT JOIN Quiz q ON SubchapterContent.ContentId = q.ContentId
                    WHERE SubchapterId = ?
                    ORDER BY SubchapterContent.ContentId ASC
                `;
                const subchapterParams = [chapterId];

                const subchapterData = await fetchData(subchapterQuery, subchapterParams);

                for (const item of subchapterData) {
                    if (item.QuizId) {
                        const optionsQuery = `
                            SELECT OptionText
                            FROM MultipleChoiceOptions
                            WHERE QuizId = ?
                            ORDER BY OptionId ASC
                        `;
                        const optionsParams = [item.QuizId];
                        item.options = await fetchData(optionsQuery, optionsParams);
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