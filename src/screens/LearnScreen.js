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

    const renderButton = (title, onPress, buttonStyle) => (
        <TouchableOpacity style={[styles.learnAreasButton, buttonStyle]} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.background}>
            <View style={styles.newContainer}>
                <Text style={styles.heading}>Überschrift</Text>
                <Text style={styles.description}>Mehr Text der erklärt, worum es in den Lernfeldern geht</Text>
                <View style={styles.buttonContainer}>
                    {renderButton('Button 1', () => console.log('Button 1 Pressed'), styles.squareButton)}
                    {renderButton('Button 2', () => console.log('Button 2 Pressed'), styles.squareButton)}
                    {renderButton('Button 3', () => console.log('Button 3 Pressed'), styles.squareButton)}
                </View>
            </View>




{/* Learnareas button with Swiper function
            <View style={styles.swiperContainer}>
                <SwiperFlatList
                    autoplayDelay={2}
                    autoplayLoop={false}
                    index={0}
                    showPagination// Hide built-in pagination dots
                >
                    {learningAreas.slice(0, 3).map((area, index) => (
                        <View key={index} style={styles.slide}>
                            <Text style={styles.text}>{area.title}</Text>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Chapters', { chapterId: area.id })}
                            >
                                <Text>Go to {area.title}</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                    <View style={styles.slide}>
                        <TouchableOpacity onPress={() => navigation.navigate('LearnAreas')}>
                        <Text style={styles.text}>Go to All LearnAreas</Text>
                        </TouchableOpacity>
                    </View>
                </SwiperFlatList> 
                <View style={styles.paginationContainer}>
                </View>
            </View> 
        */}

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
        padding: 10,
    },
    swiperContainer: {
        height: 150,
        width: '100%',
        marginBottom: 10,
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
        fontSize: 20,
        fontWeight: 'bold',
    },
    learnAreasButton: {
        backgroundColor: '#9cd3d3',
        borderRadius: 5,
        padding: 20,
        width: '100%',
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },


    newContainer: {
        backgroundColor: '#2b4353',
        alignItems: 'center',
        padding: 20,
        marginBottom: 10,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#fff',
    },
    description: {
        textAlign: 'center',
        marginBottom: 16,
        color: '#fff',
    },
    buttonContainer: {
        // Style for the container that holds the buttons
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    squareButton: {
        backgroundColor: '#9cd3d3',
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
    },

});

export default LearnScreen;