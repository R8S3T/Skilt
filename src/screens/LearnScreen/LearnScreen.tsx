import React, { useLayoutEffect } from "react";
import { ScrollView, View, StyleSheet } from 'react-native';
import { dynamicMargin, screenWidth } from "../../utilities/utils";
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
        marginBottom: dynamicMargin(15, 30),
    },
    middleSection: {
        marginBottom: dynamicMargin(15, 30),
    },
    bottomSection: {
        marginBottom: dynamicMargin(10, 20),
    },
});

export default LearnScreen;
