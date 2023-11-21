import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Keyboard, TouchableOpacity } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { slides, renderSlideItem } from '../utilities/homeScreenSlides';
import { fetchData, saveUserName } from "../utilities/fetchData";
import LearnScreenComponents from "../components/LearnScreenComponents";
import Hexagon from "../components/Hexagon";
import handleHexagonPress from "../utilities/navigationHandler";

const HomeScreen = ({ navigation }) => {
    const [showSlides, setShowSlides] = useState(true);
    const [name, setName] = useState('');
    const [animationKey, setAnimationKey] = useState(0);
    const [playAnimation, setPlayAnimation] = useState(false);
    const [greetingName, setGreetingName] = useState('');
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const handleDone = async () => {
        if (name) {
            try {
                await saveUserName(name);
                console.log('User name saved successfully');
            } catch (error) {
                console.log('Error saving user name:', error);
            }
        }
        setShowSlides(false);
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

    const handleSlideChange = (index) => {
        setCurrentSlideIndex(index);
        if (index === 3) { // For the fourth slide
            setPlayAnimation(true);
        } else {
            setPlayAnimation(false);
        }
    };

    useEffect(() => {
        if (!showSlides) {
            // Fetch latest user name from database
            const fetchUserName = async () => {
                try {
                    const result = await fetchData('SELECT Name FROM User ORDER BY ID DESC LIMIT 1', []);
                    if (result.length > 0) {
                        setGreetingName(result[0].Name);
                    }
                } catch (error) {
                    console.error('error fetching latest user name:', error);
                }
            };
            fetchUserName();
        }
    }, [showSlides]);

    return (
        <View style={styles.background}>
            {showSlides ? (
                <>
                    <ScrollView 
                        contentContainerStyle={styles.contentContainer}
                        keyboardShouldPersistTaps='handled'
                    >
                    <AppIntroSlider
                        renderItem={({ item }) => renderSlideItem(item, setName, animationKey, playAnimation)}
                        data={slides}
                        onSlideChange={handleSlideChange}
                        onDone={handleDone}
                        renderDoneButton={renderDoneButton}
                        dotStyle={isKeyboardVisible ? { display: 'none' } : { backgroundColor: 'gray' }}
                        activeDotStyle={isKeyboardVisible ? { display: 'none' } : { backgroundColor: '#e8630a' }}
                        showPagination={!isKeyboardVisible}
                    />
                </ScrollView>
                </>
            ) : (
                <>
                    <Text style={styles.homeText}>Hallo, {greetingName}</Text>
                    <TouchableOpacity onPress={() => onHexagonPress('someId')}>
                        <Hexagon size={60} color="blue">
                            {/* Child components, if any */}
                        </Hexagon>
                    </TouchableOpacity>
                    <LearnScreenComponents navigation={navigation}/>
                </>
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
    contentContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
});

export default HomeScreen;