import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import DragDropLogic, { DropZoneValues } from './DragDropLogic';

interface QuizData {
    Question: string;
    /* options: string[]; */  // Array of options for the quiz
}

interface DragDropAnswersProps {
    quiz: QuizData;
    onContinue: () => void;
}

const DragDropAnswers: React.FC<DragDropAnswersProps> = ({ quiz, onContinue }) => {
    console.log("Rendering DragDropAnswers");
    // State to track the drop zone layout
    const [dropZoneValues, setDropZoneValues] = useState<DropZoneValues | null>(null);
    const staticOptions = [
        "100", // Correct for the first blank
        "1",   // Correct for the second blank
        "50",  // Incorrect option
        "10"   // Incorrect option
    ];

    // Define the drop zone layout
    const onLayout = (event: any) => {
        const layout = event.nativeEvent.layout;
        setDropZoneValues({
            x: layout.x,
            y: layout.y,
            width: layout.width,
            height: layout.height
        });
    };

    // Handle the drop logic
    const onDrop = (isDropped: boolean, option: string) => {
        if (isDropped) {
            // Logic to handle a successful drop
            // For example, check if the option is correct and update state accordingly
            console.log(`Dropped: ${option}`);
        } else {
            // Logic for when item is not dropped in the drop zone
            console.log('Item not dropped in the drop zone');
        }
    };
    console.log("Quiz data:", quiz);

    return (
        <View style={styles.container}>
            <Text style={styles.question}>{quiz.Question}</Text>
            <View onLayout={onLayout} style={styles.dropZone}>
                <Text>Drop items here</Text>
            </View>
            {dropZoneValues && staticOptions.map((option, index) => (
                <DragDropLogic 
                    key={index}
                    itemText={option}
                    dropZoneValues={dropZoneValues}
                    onDrop={(isDropped) => onDrop(isDropped, option)}
                />
            ))}
            <Button title="Continue" onPress={onContinue} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    question: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    dropZone: {
        width: 200,
        height: 100,
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
});

export default DragDropAnswers;
