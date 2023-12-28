import React, { useLayoutEffect } from "react";
import { ScrollView, View, StyleSheet } from 'react-native';
import TopSection from "./TopSection";
import MiddleSection from "./MiddleSection";
import BottomSection from "./BottomSection";

const LearnScreen: React.FC = () => {

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
            <View style={styles.topSection}>
                <TopSection onButtonPress={handleButtonPress} />
            </View>
            <View style={styles.middleSection}>
                <MiddleSection onButtonPress={handleButtonPress} />
            </View>
            <View style={styles.bottomSection}>
                <BottomSection
                    onPress={() => console.log('Prüfungsaufgaben pressed')}
                    imageSource={require('../../../assets/Images/owl.png')}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    contentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        paddingBottom: 20,
    },
    topSection: {
        marginTop: 10,
        marginBottom: 20,
      },
      middleSection: {
        marginBottom: 20, // Adjust the value as needed
      },
      bottomSection: {
        // You may not need a marginBottom here unless you want extra space below the bottom section
      },
});

export default LearnScreen;
