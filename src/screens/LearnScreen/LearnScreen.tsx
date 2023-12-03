import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import { Dimensions } from "react-native";
import TopSection from "./TopSection";
import MiddleSection from "./MiddleSection";


const LearnScreen = ({ navigation }) => {
    const handleButtonPress = (title) => {
        console.log(`${title} Pressed`);
        // Additional logic following later
    };

    return (
        <View style={styles.background}>
            <TopSection onButtonPress={handleButtonPress} />
            <MiddleSection onButtonPress={handleButtonPress} />
            {handleButtonPress('Prüfungsaufgaben', () => console.log('Prüfungsaufgaben Pressed'))}
        </View>
    );
};

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
});

export default LearnScreen;
