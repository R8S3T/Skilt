import { fetchData } from "./fetchData";

// Function to fetch explanation for given word and content

export const getExplanation = async (word, contentId) => {
    try {
        const query = `SELECT Explanation FROM WordExplanations WHERE Word = ? AND ContentId =?`;
        const params = [word, contentId];
        console.log("params in explanationHelper:", params);
        const explanations = await fetchData(query, params);
        // For now assume there will be only one word to explain per content
        return explanations.length > 0 ? explanations[0].Explanation : '';
    } catch (error) {
        console.error('Error fetching explanation:', error);
        return '';
    }
};

// Function to fetch all words that have explanation for a given content
export const getWordsWithExplanations = async (contentId) => {
    try {
        const query = `SELECT Word FROM WordExplanations WHERE ContentId = ?`;
        const params = [contentId];
        const words = await fetchData(query, params);
        // Map results to an words array
        return words.map(entry => entry.Word);
    } catch (error) {
        console.error('Error fetching words with explanations:', error);
        return [];
    }
};