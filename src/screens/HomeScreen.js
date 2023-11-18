import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { slides, renderSlideItem } from '../utilities/homeScreenSlides';

const HomeScreen = () => {
    const [showSlides, setShowSlides] = useState(true);
    const [name, setName] = useState('');
    const [animationKey, setAnimationKey] = useState(0);
    const [playAnimation, setPlayAnimation] = useState(false);


    const handleDone = () => {
        setShowSlides(false);
    };

    const renderDoneButton = () => {
        return (
            <View style={styles.doneButtonView}>
                <Text style={styles.doneButtonText}>Done</Text>
            </View>
        );
    };

    const handleSlideChange = (index) => {
        if (index === 3) { // For the fourth slide
            setPlayAnimation(true);
        } else {
            setPlayAnimation(false);
        }
    };

    return (
        <View style={styles.background}>
            {showSlides ? (
                <AppIntroSlider
                    renderItem={({ item }) => renderSlideItem(item, setName, animationKey, playAnimation)}
                    data={slides}
                    onSlideChange={handleSlideChange}
                    onDone={handleDone}
                    renderDoneButton={renderDoneButton}
                    dotStyle={{ backgroundColor: 'gray' }}
                    activeDotStyle={{ backgroundColor: '#e8630a' }}
                />
            ) : (
                <Text style={styles.homeText}>HomeScreen</Text>
            )}

        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#f6f5f5',
        flex: 1,
        justifyContent: 'center'
    },
    slide: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    animation: {
        width: 150,
        height: 150,
        alignSelf: 'center',
    },
    title: {
        fontSize: 18,
        color: '#000',
        textAlign: 'center',
        marginVertical: 10,
    },
    text: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
    },
    doneButtonView: {
        padding: 10,
        backgroundColor: '#e8630a',
        borderRadius: 5,
    },
    doneButtonText: {
        color: 'white', 
        fontSize: 16,
    },
    homeText: {
        fontSize: 24,
        textAlign: 'center',
    },
});


export default HomeScreen;