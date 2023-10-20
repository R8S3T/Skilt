import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import MultipleChoice from "../screens/Quizzes/MultipleChoice";


const QuizRenderer = ({ QuizType, ...props }) => {
    switch(QuizType) {
        case 'MultipleChoice':
            return <MultipleChoice {...props} />;
        
        // Room for more cases with other quiz types

        default:
            return null;
    }
};

export default QuizRenderer;