import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { AnswerStatus } from './types';

interface SentenceWithBlanksProps {
    sentenceParts: string[];
    filledAnswers: AnswerStatus[];
}

const SentenceWithBlanks: React.FC<SentenceWithBlanksProps> = ({ sentenceParts, filledAnswers }) => {
    return (
        <Text style={styles.sentence}>
            {sentenceParts.map((part, index) => (
                <Text key={index}>
                {part}
                {index < sentenceParts.length - 1 && (
                    <Text style={
                        filledAnswers[index].answer !== ''
                        ? (filledAnswers[index].isCorrect ? styles.correctBlank : styles.incorrectBlank)
                        : styles.blank
                    }>
                    {filledAnswers[index].answer || '___'}
                    </Text>
                )}
                </Text>
            ))}
        </Text>
    );
};

const styles = StyleSheet.create({
    sentence: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#FFF',
        margin: 20,
    },
    blank: {
        fontWeight: 'bold',
        minWidth: 50,
    },
    correctBlank: {
        fontWeight: 'bold',
        color: 'green',
        minWidth: 50,
    },
    incorrectBlank: {
        fontWeight: 'bold',
        color: 'red',
        minWidth: 50,
    },
});

export default SentenceWithBlanks;
