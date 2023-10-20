import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

const MultipleChoice = ({ question, answers, correctAnswer, onAnswer }) => {
    const [selected, setSelected] = useState(null);

    const handleAnswer = (answer) => {
        setSelected(answer);
        const isCorrect = answer === correctAnswer;
        onAnswer(isCorrect)
    };

    if (!answers || !Array.isArray(answers)) {
        return <Text>No answers provided</Text>;
    }

    return (
        <View>
            <Text>{question}</Text>
            {answers.map((answer, index) => (
                <Button
                    key={index}
                    title={answer}
                    onPress={() => handleAnswer(answer)}
                    color={selected === answer ? 'green' : 'blue'}
                />
            ))}
        </View>
    );
};

export default MultipleChoice;