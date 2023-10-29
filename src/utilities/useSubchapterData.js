import { useEffect, useMemo } from "react";
import useFetchData from "./useFetchData";

const useSubchapterData = (chapterId) => {
    console.log('Input chapterId:', chapterId);
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
    useEffect(() => {
        if(error) {
            console.log('Error:', error);
        }else {
            console.log('Fetched data: ', data)
        }
    }, [data, error])
    return { data, error };
};

export default useSubchapterData;