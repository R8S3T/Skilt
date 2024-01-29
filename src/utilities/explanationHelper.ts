import { fetchData } from "./fetchData";

interface ExplanationEntry {
    Explanation: string;
}

interface WordEntry {
    Word: string;
}

// Function to fetch explanation for a given word and contentId
export const getExplanation = async (word: string, contentId: number): Promise<string> => {
    try {
        const query = `SELECT Explanation FROM WordExplanations WHERE Word = ? AND ContentId = ?`;
        const params = [word, contentId];
        const explanations: ExplanationEntry[] = await fetchData(query, params);
        // Assume there will be only one explanation per word per content
        return explanations.length > 0 ? explanations[0].Explanation : '';
    } catch (error) {
        console.error('Error fetching explanation:', error);
        return '';
    }
};

// Function to fetch all words that have an explanation for a given contentId
export const getWordsWithExplanations = async (contentId: number): Promise<string[]> => {
  try {
    const query = `SELECT Word FROM WordExplanations WHERE ContentId = ?`;
    const params = [contentId];
    const words: WordEntry[] = await fetchData(query, params);
    // Map results to an array of words
    return words.map(entry => entry.Word);
  } catch (error) {
    console.error('Error fetching words with explanations:', error);
    return [];
  }
};
