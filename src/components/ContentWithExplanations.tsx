import React, { useState, useEffect, ReactNode } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { getWordsWithExplanations, getExplanation } from '../utilities/explanationHelper';
import { scaleFontSize } from '../utilities/utils';

interface ExplanationModalProps {
    visible: boolean;
    explanation: string;
    onClose: () => void;
}

const ExplanationModal: React.FC<ExplanationModalProps> = ({ visible, explanation, onClose }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}>
            <View style={styles.modalView}>
                <Text>{explanation}</Text>
                <TouchableOpacity onPress={onClose}>
                    <Text style={styles.closeButton}>Close</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

interface ContentWithExplanationsProps {
    content: ReactNode;  // JSX content
    contentId: number;
}

const ContentWithExplanations: React.FC<ContentWithExplanationsProps> = ({ content, contentId }) => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedExplanation, setSelectedExplanation] = useState<string>('');
    const [wordsWithExplanations, setWordsWithExplanations] = useState<string[]>([]);

    useEffect(() => {
        const fetchWordsWithExplanations = async () => {
            const words = await getWordsWithExplanations(contentId);
            setWordsWithExplanations(words);
        };
        fetchWordsWithExplanations();
    }, [contentId]);

    const handlePressWord = async (word: string) => {
        const explanation = await getExplanation(word, contentId);
        setSelectedExplanation(explanation);
        setModalVisible(true);
    };

    return (
        <View>
            <View style={styles.contentText}>
                {content}
            </View>
            <ExplanationModal
                visible={modalVisible}
                explanation={selectedExplanation}
                onClose={() => setModalVisible(false)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: '#2196F3',
        color: 'white',
        padding: 10,
        borderRadius: 5,
    },
    contentText: {
        // Style for the content text container
    },
    explanationMarker: {
        // Style for words that have explanations
    },
});

export default ContentWithExplanations;
