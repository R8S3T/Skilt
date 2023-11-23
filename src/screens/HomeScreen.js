import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from 'react-native';
import { fetchData, saveUserName } from "../utilities/fetchData";
import LearnScreenComponents from "../components/LearnScreenComponents";

const HomeScreen = ({ navigation }) => {
    const [showSlides, setShowSlides] = useState(true);
    const [name, setName] = useState('');
    const [animationKey, setAnimationKey] = useState(0);
    const [playAnimation, setPlayAnimation] = useState(false);
    const [greetingName, setGreetingName] = useState('');

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
                <IntroSlider
                    onDone={() => setShowSlides(false)}
                    setName={setName}
                    navigation={navigation}
                />
            ) : (
                <>
                    <Text style={styles.homeText}>Hallo, {greetingName}</Text>
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