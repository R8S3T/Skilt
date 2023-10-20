import useFetchData from "./useFetchData";

const useSubchapterData = (chapterId) => {
    const query = `
    SELECT SubchapterContent.ContentId AS scContentId, ContentData, q.QuizId, q.ContentId AS quizContentId, q.Question, q.Option1, q.Option2, q.Option3, q.Option4
    FROM SubchapterContent
    LEFT JOIN Quiz q ON SubchapterContent.ContentId = q.ContentId
    WHERE SubchapterId = ?
    ORDER BY SubchapterContent.ContentId ASC
    `;

    const params = [chapterId];
    return useFetchData(query, params);
};

export default useSubchapterData;