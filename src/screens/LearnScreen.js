import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { fetchData } from "../utilities/fetchData";
import { learningAreas } from "../components/LearningAreasData";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { Dimensions } from "react-native";


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
<View style={styles.swiperContainer}>
                <SwiperFlatList
                    autoplay
                    autoplayDelay={2}
                    autoplayLoop
                    index={0}
                    showPagination={false} // Hide built-in pagination dots
                >
                    {learningAreas.map((area, index) => (
                        <View key={index} style={styles.slide}>
                            <Text style={styles.text}>{area.title}</Text>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Chapters', { chapterId: area.id })}
                            >
                                <Text>Go to {area.title}</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </SwiperFlatList>
                <View style={styles.paginationContainer}>
                    {/* Render custom pagination here */}
                </View>
            </View>

            {renderButton('Übungen', () => console.log('Übungen Pressed'))}
            {renderButton('Prüfungsaufgaben', () => console.log('Prüfungsaufgaben Pressed'))}
            {renderButton('Werkzeugkunde', () => console.log('Werkzeugkunde Pressed'))}
        </View>
    );
};

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    swiperContainer: {
        height: 150,
        width: '100%',
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
        width: screenWidth,
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