import { useEffect, useState } from "react";
import { fetchData } from "./fetchData";

interface SubchapterItem {
    scContentId: number;
    ContentData: string;
    QuizId?: number;
    quizContentId?: number;
    Question?: string;
    options?: string[];
    imagePaths?: string[];
}



const useSubchapterData = (chapterId: number) => {
    const [data, setData] = useState<SubchapterItem[]>([]);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadSubchapterData = async () => {
            setLoading(true);
            console.log(`Fetching subchapter data for chapterId: ${chapterId}`);

            try {
                const subchapterQuery = `
                SELECT SubchapterContent.ContentId AS scContentId, ContentData,
                q.QuizId, q.ContentId AS quizContentId, q.Question, q.Type
                FROM SubchapterContent
                LEFT JOIN Quiz q ON SubchapterContent.ContentId = q.ContentId
                WHERE SubchapterId = ?
                ORDER BY SubchapterContent.SortOrder ASC
            `;
                const subchapterParams = [chapterId];
                const subchapterData: any[] = await fetchData(subchapterQuery, subchapterParams);
                const formattedDataPromises = subchapterData.map(async (item) => {
                    let options: string[] | undefined = undefined;

                    // Logic for fetching quiz options
                    if (item.QuizId && item.Type === 'multiple_choice') {
                        const optionsQuery = `
                            SELECT OptionText
                            FROM MultipleChoiceOptions
                            WHERE QuizId = ?
                            ORDER BY OptionId ASC
                        `;
                        const optionsParams = [item.QuizId];
                        options = await fetchData(optionsQuery, optionsParams);
                    } else if (item.QuizId && item.Type === 'cloze_test') {
                        const clozeOptionsQuery = `
                            SELECT OptionText
                            FROM ClozeTest
                            WHERE QuizId = ?
                            ORDER BY SortOrder ASC
                        `;
                        const clozeOptionsParams = [item.QuizId];
                        options = await fetchData(clozeOptionsQuery, clozeOptionsParams);
                    }

                    // Adjusted logic for fetching image paths with type assertion
                    const imageQuery = `
                        SELECT ImagePath
                        FROM SubchapterContentImages
                        WHERE ContentId = ?
                    `;
                    const imageParams = [item.scContentId];
                    const images = await fetchData<{ ImagePath: string }>(imageQuery, imageParams);
                    const imagePaths = images.map(img => img.ImagePath);

                    // Return the combined data, including the original item data, options, and image paths
                    console.log(imagePaths);
                    return {
                        scContentId: item.scContentId,
                        ContentData: item.ContentData,
                        QuizId: item.QuizId,
                        quizContentId: item.quizContentId,
                        Question: item.Question,
                        options: options,
                        imagePaths: imagePaths // Include the fetched image paths
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

