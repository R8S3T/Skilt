import { useEffect, useState } from "react";
import { fetchData } from "./fetchData";

export interface SubchapterItem {
    scContentId: number;
    ContentData: string;
    QuizId?: number;
    quizContentId?: number;
    Question?: string;
    options?: string[];
}

const useSubchapterData = (chapterId: number) => {
    const [data, setData] = useState<SubchapterItem[]>([]);
    const [error, setError] = useState<Error | null>(null);
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
                const subchapterData: any[] = await fetchData(subchapterQuery, subchapterParams);

                const formattedDataPromises: Promise<SubchapterItem>[] = subchapterData.map(async (item: any) => {
                    let options: string[] | undefined = undefined;

                    if (item.QuizId) {
                        const optionsQuery = `
                            SELECT OptionText
                            FROM MultipleChoiceOptions
                            WHERE QuizId = ?
                            ORDER BY OptionId ASC
                        `;
                        const optionsParams = [item.QuizId];
                        options = await fetchData(optionsQuery, optionsParams);
                    }

                    return {
                        scContentId: item.scContentId,
                        ContentData: item.ContentData,
                        QuizId: item.QuizId,
                        quizContentId: item.quizContentId,
                        Question: item.Question,
                        options: options
                    };
                });

                const formattedData = await Promise.all(formattedDataPromises);
                setData(formattedData);
            } catch (e) {
                if (e instanceof Error) {
                    setError(e);
                }
            } finally {
                setLoading(false);
            }
        };

        loadSubchapterData();
    }, [chapterId]);

    return { data, error, loading };
};

export default useSubchapterData;
