import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';

const ExplanationModal = ({ visible, explanation, onClose }) => {
    return (
        <Modal
            animationType='slide'
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={StyleSheet.modalView}>
                <Text>{explanation}</Text>
                <TouchableOpacity onPress={onClose}>
                    <Text style={StyleSheet.closeButton}>Close</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

const ContentWithExplanations = ({ content, contentId }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedExplanation, setSelectedExplanation] = useState('');
    const [wordsWithExplanations, setWordsWithExplanations] = useState([]);

    useEffect(() => {
        // Fetch words with explanation for current content
        const getExplanation = async () => {
            const words = await getWordsWithExplanations(contentId);
            setWordsWithExplanations(words);
        };
        fetchWordsWithExplanations();
    }, [contentId]);

    const handleWordPress = async (word) => {
        const explanation = await getExplanation(word);
        setSelectedExplanation(explanation);
        setModalVisible(true);
    };

    const renderContentWithLinks = () => {
        return content.split(' '),map((word, index) => {
            if (wordsWithExplanations.includes(word)) {
                return (
                    <Text key={index}>
                        <TouchableOpacity onPress={() => handleWordPress(word)}>
                            {word}<Text style={StyleSheet.explanationMarker}>?</Text>
                        </TouchableOpacity>{' '}
                    </Text>
                );
            }
            return <Text key={index}>{word}</Text>;
        });
    };

    return (
        <View>
            <Text style={StyleSheet.contentText}>
                {renderContentWithLinks()}
            </Text>
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
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
        },
        closeButton: {
        marginTop: 20,
        backgroundColor: '#2196F3',
        color: 'white',
        padding: 10,
        borderRadius: 5,
        },
        contentText: {
        fontSize: 16,
        color: 'black',
        },
        explanationMarker: {
        fontSize: 16,
        color: 'blue',
        textDecorationLine: 'underline',
        }
    });

    export default ContentWithExplanations;