import { useEffect } from "react";
import useFetchData from "./useFetchData";

const useSubchapterData = (chapterId) => {
    console.log('Input chapterId:', chapterId);
    const query = `
    SELECT SubchapterContent.ContentId AS scContentId, ContentData, q.QuizId, q.ContentId AS quizContentId, q.Question, q.Option1, q.Option2, q.Option3, q.Option4
    FROM SubchapterContent
    LEFT JOIN Quiz q ON SubchapterContent.ContentId = q.ContentId
    WHERE SubchapterId = ?
    ORDER BY SubchapterContent.ContentId ASC
    `;

    const params = [chapterId];
    const { data, error } = useFetchData(query, params);
    useEffect(() => {
        console.log('Fetching Data with query: ', query);
        console.log('And params: ', params);
        if(error) {
            console.log('Error:', error);
        }else {
            console.log('Fetched data: ', data)
        }
    }, [data, error, query, params])
    return { data, error };
};

export default useSubchapterData;