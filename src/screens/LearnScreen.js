import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { fetchData } from "../utilities/fetchData";
import { learningAreas } from "../components/LearningAreasData";
import Swiper from "react-native-swiper";

const LearnScreen = ({ navigation }) => {
    const [greetingName, setGreetingName] = useState('');

    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const result = await fetchData('SELECT Name FROM User ORDER BY ID DESC LIMIT 1', []);
                if (result.length > 0) {
                    setGreetingName(result[0].Name);
                }
            } catch (error) {
                console.error('Error fetching user name:', error);
            }
        };

        fetchUserName();
    }, []);

    const renderButton = (title, onPress) => (
        <TouchableOpacity style={styles.learnAreasButton} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.background}>
            <Swiper
                style={styles.swiper}
                showsButtons={true}
                loop={false}
            >
                {learningAreas.map((area) => {
                    console.log(area);
                    return (
                        <View key={area.id} style={styles.slide}>
                        <Text style={styles.text}>{area.title}</Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Chapters', { chapterId: area.id })}
                        >
                            <Text>Gehe zu {area.title}</Text>
                        </TouchableOpacity>
                    </View>
                    )
                })}
            </Swiper>
            {renderButton('Übungen', () => console.log('Übungen Pressed'))}
            {renderButton('Prüfungsaufgaben', () => console.log('Prüfungsaufgaben Pressed'))}
            {renderButton('Werkzeugkunde', () => console.log('Werkzeugkunde Pressed'))}
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    swiper: {
        height: 200, // Adjust this value as needed
        width: '100%',
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    learnAreasButton: {
        backgroundColor: '#9cd3d3',
        borderRadius: 5,
        padding: 20,
        width: '100%',
        marginBottom: 10, // Space between buttons
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default LearnScreen;