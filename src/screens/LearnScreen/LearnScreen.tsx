import React from "react";
import { ScrollView, Dimensions, StyleSheet } from 'react-native';
import TopSection from "./TopSection";
import MiddleSection from "./MiddleSection";
import BottomSection from "./BottomSection";


const LearnScreen = ({ navigation }) => {
    const handleButtonPress = (title: string) => {
        console.log(`${title} Pressed`);
        // Additional logic following later
    };

    return (
        <ScrollView
            style={styles.background} 
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
        >
            <TopSection onButtonPress={handleButtonPress} />
            <MiddleSection onButtonPress={handleButtonPress} />
            <BottomSection
                onPress={() => console.log('Prüfungsaufgaben pressed')}
                imageSource={require('../../../assets/Images/exam.png')}
            />
        </ScrollView>
    );
};

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    contentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        paddingBottom: 20,
    },
});

export default LearnScreen;
