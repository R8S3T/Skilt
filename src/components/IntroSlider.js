import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Keyboard } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { fetchData } from "../utilities/fetchData";
import { slides, renderSlideItem } from '../utilities/homeScreenSlides';

const IntroSlider = ({ navigation }) => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [playAnimation, setPlayAnimation] = useState(false);
    const [name, setName] = useState('');

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const handleSlideChange = (index) => {
        console.log('Current slide index:', index)
        setCurrentSlideIndex(index);
        if (index === slides.length -1) {
            setPlayAnimation(true);
        } else {
            setPlayAnimation(false);
        }
    };

    const renderDoneButton = () => {
        // Render this button if it's the last slide and the keyboard is not visible
        if (currentSlideIndex === slides.length - 1 && !isKeyboardVisible) {
            return (
                <View style={styles.doneButtonView}>
                    <Text style={styles.doneButtonText}>Done</Text>
                </View>
            );
        }
        return null;
    };
    const handleDone = async () => {
        if (name) {
            try {
                await saveUserName(name);
                console.log('User name saved successfully');
            } catch (error) {
                console.log('Error saving user name:', error);
            }
        }
        navigation.navigate('MainApp');
    };

    return (
        <ScrollView
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps='handled'
        >
            <AppIntroSlider
                renderItem={({ item }) => renderSlideItem(item, setName, navigation, playAnimation)}
                data={slides}
                onSlideChange={handleSlideChange}
                onDone={handleDone}
                renderDoneButton={renderDoneButton}
                dotStyle={isKeyboardVisible ? { display: 'none' } : { backgroundColor: 'gray' }}
                activeDotStyle={isKeyboardVisible ? { display: 'none' } : { backgroundColor: '#e8630a' }}
                showPagination={!isKeyboardVisible}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    // Your styles here
    doneButtonView: {
        padding: 10,
        backgroundColor: '#e8630a',
        borderRadius: 5,
    },
    doneButtonText: {
        color: 'white',
        fontSize: 16,
    },
    contentContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
});

export default IntroSlider;