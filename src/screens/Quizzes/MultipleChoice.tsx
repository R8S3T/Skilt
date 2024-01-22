import React, { useState } from "react";
import { Text,View, StyleSheet, TouchableOpacity } from "react-native";
import { Quiz } from "../../utilities/useFetchData";
import ControlButtons from "./ControlButtons";

interface QuizData {
    Question: string;

    Answer: string;
    options: string[];
}

type OptionType = string;

interface MultipleChoiceProps {
    quiz: Quiz;
    onContinue: () => void;
}

const MultipleChoice: React.FC<MultipleChoiceProps> = ({ quiz, onContinue }) => {
    const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false); // New state for tracking if the answer is correct

    const handleAnswer = (option: OptionType) => {
        setSelectedOption(option);
        setShowFeedback(false);
        setIsAnswerCorrect(false); // Reset correct answer state
    };

    const handleSubmit = () => {
        if (isAnswerCorrect) {
            onContinue(); // Navigate to the next slide if the answer is already confirmed as correct
        } else {
            const isCorrect = selectedOption === quiz.Answer;
            setShowFeedback(true);
            setIsAnswerCorrect(isCorrect); // Set the state to true if the answer is correct

            if (!isCorrect) {
                // Keep the quiz for another attempt
            }
        }
    };

    const getButtonStyle = (option: OptionType) => {
        let style = styles.button;

        if (showFeedback && selectedOption) {
            if (selectedOption === option) {
                if (option === quiz.Answer) {

                    style = { ...style, borderColor: '#32CD32', borderWidth: 4 };
                } else {
                    style = { ...style, borderColor: '#FF6347', borderWidth: 4 };
                }
            }
        }
        else if (option === selectedOption && !isAnswerCorrect) {
            style = { ...style, borderColor: '#8fc2c2', borderWidth: 4 };
        }
        return style;
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.quizText}>{quiz.Question}</Text>
                {quiz.options && quiz.options.map((option, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => handleAnswer(option)}
                        style={getButtonStyle(option)}
                    >
                        <Text style={styles.buttonText}>{option}</Text>
                    </TouchableOpacity>
                ))}
                {showFeedback && (
                    <Text style={styles.answerText}>
                        {selectedOption === quiz.Answer ? 'Richtige Antwort.' : 'Falsche Antwort, bitte versuche es noch einmal.'}
                    </Text>
                )}
            </View>
            <View style={styles.footer}>
                <ControlButtons
                    onClear={() => setSelectedOption(null)}
                    onSubmit={handleSubmit}
                    showBackspaceButton={false}
                    submitButtonText={isAnswerCorrect ? 'Weiter' : 'Bestätigen'}
                />
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    content: {
        flex: 1,
    },
    footer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    quizText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 60,
        marginBottom: 50,
        marginHorizontal: 20,
        textAlign: 'center',
        color: '#FFF',
        lineHeight: 30,
    },
    button: {
        backgroundColor: '#2b4353',
        minWidth: '85%',
        padding: 20,
        marginVertical: 20,
        marginHorizontal: 20,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#8fc2c2',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontFamily: 'OpenSans-Regular',
        fontSize: 18,
        textAlign: 'center',
    },
    answerText: {
        color: '#FFF',
        marginVertical: 50,
        fontSize: 18,
        textAlign: 'center',
    }
});

export default MultipleChoice;
