import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { getWordsWithExplanations, getExplanation } from '../utilities/explanationHelper';

const ExplanationModal = ({ visible, explanation, onClose }) => {
    return (
        <Modal
            animationType='slide'
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalView}>
                <Text>{explanation}</Text>
                <TouchableOpacity onPress={onClose}>
                    <Text style={styles.closeButton}>Close</Text>
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
        // Corrected function call here
        const fetchWordsWithExplanations = async () => {
            const words = await getWordsWithExplanations(contentId);
            setWordsWithExplanations(words);
        };
        fetchWordsWithExplanations();
    }, [contentId]);

    const handleWordPress = async (word) => {
        const explanation = await getExplanation(word, contentId);
        if (explanation) { // Only show the modal if there is an explanation
            setSelectedExplanation(explanation);
            setModalVisible(true);
        }
    };

    const renderContentWithLinks = () => {
        return (
            <Text>
                {content.split(' ').map((word, index) => {
                    const isWordWithExplanation = wordsWithExplanations.includes(word);
                    return (
                        <React.Fragment key={index}>
                            {isWordWithExplanation ? (
                                <TouchableOpacity onPress={() => handleWordPress(word)}>
                                    <Text style={styles.explanationMarker}>{word}</Text>
                                </TouchableOpacity>
                            ) : (
                                <Text>{word}</Text>
                            )}
                            {' '}
                        </React.Fragment>
                    )
                })}
            </Text>
        )
    };

    return (
        <View>
            <Text style={styles.contentText}>
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