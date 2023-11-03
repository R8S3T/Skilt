import { useEffect, useMemo } from "react";
import useFetchData from "./useFetchData";

const useSubchapterData = (chapterId) => {
    const query = useMemo(() => `
        SELECT SubchapterContent.ContentId AS scContentId, ContentData, q.QuizId, q.ContentId AS quizContentId, q.Question, q.Option1, q.Option2, q.Option3, q.Option4
        FROM SubchapterContent
        LEFT JOIN Quiz q ON SubchapterContent.ContentId = q.ContentId
        WHERE SubchapterId = ?
        ORDER BY SubchapterContent.ContentId ASC
    `
    );

    //The first [chapterId] is defining what is being memoized, and the second [chapterId] is defining when to recompute the memoized value.
    const params = useMemo(() => [chapterId], [chapterId]);
    const { data, error } = useFetchData(query, params);

    const processedData = data.map(item => {
        if (item.QuizId) {
            const optionsQuery = `
                SELECT OptionText
                FROM MultipleChoiceOptions
                WHERE QuizId = ?
                ORDER BY OptionId ASC
            `;
            const optionsParams = [item.QuizId];
            const optionsData = useFetchData(optionsQuery, optionsParams).data;

            item.options = optionsData.map(opt => opt.OptionText);
        }
        return item;
    });
    return { data: processedData, error };
};

export default useSubchapterData;