import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';


interface LearnAreaComponentProps {
    id: string;
    title: string;
    onPress: () => void;
}

const LearnAreaComponent: React.FC<LearnAreaComponentProps> = ({ id, title, onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.learnAreaContainer}
        >
            <Text style={styles.learnAreaText}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    learnAreaContainer: {
        backgroundColor: '#fff',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    learnAreaText: {
        fontSize: 10,
        color: '#555',
    },
});

export default LearnAreaComponent;
