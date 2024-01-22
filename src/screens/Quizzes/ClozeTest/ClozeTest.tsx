import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import OptionButton from './OptionButton';
import SentenceWithBlanks from './SentenceWithBlanks';
import ControlButtons from '../ControlButtons';
import { AnswerStatus } from './types';

interface ClozeTestProps {
    sentenceParts: string[];
    options: string[];
    correctAnswers: string[];
    onContinue: () => void; 
}

const ClozeTest: React.FC<ClozeTestProps> = ({ sentenceParts, options, correctAnswers, onContinue }) => {
    const [filledAnswers, setFilledAnswers] = useState<AnswerStatus[]>(Array(sentenceParts.length - 1).fill({ answer: '', isCorrect: null }));
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [submitButtonText, setSubmitButtonText] = useState('Bestätigen');

    const handleOptionSelect = (option: string) => {
        const nextBlankIndex = filledAnswers.findIndex(answerStatus => answerStatus.answer === '');
        if (nextBlankIndex !== -1) {
            const newAnswers = [...filledAnswers];
            newAnswers[nextBlankIndex] = { answer: option, isCorrect: null }; // Storing as AnswerStatus
            setFilledAnswers(newAnswers);
        }
    };

    const handleClearAnswers = () => {
        setFilledAnswers(Array(sentenceParts.length - 1).fill({ answer: '', isCorrect: false }));
        setSelectedOptions([]);
    };

    const handleSubmit = () => {
        const updatedAnswers = filledAnswers.map((filledAnswer, index) => {
            const isCorrect = filledAnswer.answer === correctAnswers[index];
            return { ...filledAnswer, isCorrect };
        });

        setFilledAnswers(updatedAnswers);
        const isAllCorrect = updatedAnswers.every(answerStatus => answerStatus.isCorrect);

        if (isAllCorrect) {
            setFeedbackMessage("Correct! Well done.");
            setSubmitButtonText("Weiter");
        } else {
            setFeedbackMessage("Incorrect, please try again.");
        }
    };

    const handleContinue = () => {
        if (submitButtonText === "Weiter") {
            onContinue(); // Call the provided onContinue function to navigate to the next page
        } else {
            handleSubmit(); // Otherwise, submit the answers
        }
    };

    return (
        <View style={styles.container}>
            <SentenceWithBlanks sentenceParts={sentenceParts} filledAnswers={filledAnswers} />
            <View style={styles.optionsContainer}>
                {options.map((option, index) => (
                <OptionButton
                    key={index}
                    option={option}
                    onSelect={handleOptionSelect}
                    isSelected={selectedOptions.includes(option)}
                />
                ))}
            </View>
            <Text style={styles.feedbackText}>{feedbackMessage}</Text>
            <View style={styles.footer}>
            <ControlButtons
                    onClear={handleClearAnswers}
                    onSubmit={handleContinue}
                    showBackspaceButton={true}
                    submitButtonText={submitButtonText}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    optionsContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    feedbackText: {
        fontSize: 16,
        color: '#FFF',
        marginVertical: 10,
    },
    footer: {

    },
});

export default ClozeTest;