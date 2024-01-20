import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import OptionButton from './OptionButton';
import SentenceWithBlanks from './SentenceWithBlanks';
import ControlButtons from './ControlButtons';
import { AnswerStatus } from './types';

interface ClozeTestProps {
    sentenceParts: string[];
    options: string[];
    correctAnswers: string[];
}

const ClozeTest: React.FC<ClozeTestProps> = ({ sentenceParts, options, correctAnswers }) => {
    const [filledAnswers, setFilledAnswers] = useState<AnswerStatus[]>(Array(sentenceParts.length - 1).fill({ answer: '', isCorrect: null }));

    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

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
            alert("Correct!");
        } else {
            alert("Incorrect, try again!");
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
            <ControlButtons onClear={handleClearAnswers} onSubmit={handleSubmit} />
        </View>
        );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    optionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
});

export default ClozeTest;