import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { dynamicCardHeight, scaleFontSize, screenWidth } from '../../utilities/utils';
import EducationDataComponent from './EducationDataComponent';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { LearnStackParamList } from '../../components/LearnStackNavigator';

interface LearnArea {
    id: string;
    title: string;
}

interface EducationYear {
    year: number;
    learnAreas: LearnArea[];
}

const YearsScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp<LearnStackParamList>>();

    const renderYear = (item: EducationYear) => {
        const backgroundColors = ['#a8d1d1', '#2b4353', '#e8630a', '#9ba6a5'];
        const globalIndex = item.year - 1;

        return (
            <TouchableOpacity
                key={item.year.toString()}
                style={[styles.card, { borderColor: backgroundColors[globalIndex] }]}
                onPress={() => navigation.navigate('ChaptersScreen', { year: item.year })}
            >
                <View style={[styles.yearRectangle, { backgroundColor: backgroundColors[globalIndex] }]}>
                    <Text style={styles.number}>{`${item.year}. Lehrjahr`}</Text>
                </View>
                <Text style={styles.learnArea}>{`${item.learnAreas.length} Lernfelder`}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <EducationDataComponent>
            {educationData => (
                <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                    <Text style={styles.header}>Wähle Dein Lehrjahr</Text>
                    {educationData.map((item, index) => renderYear(item, index))}
                </View>
                </ScrollView>
            )}
            </EducationDataComponent>
        );
};


const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 10,
    },
    header: {
        fontSize: 28,
        color: '#2b4353',
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    card: {
        width: '85%',
        minHeight: dynamicCardHeight(80, 120),
        borderRadius: 10,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: 'transparent',
        borderWidth: 2,
        marginBottom: 30,
        overflow: 'hidden',
        paddingTop: 0,
        paddingBottom: 30,
        paddingHorizontal: 20,
    },
    yearRectangle: {
        width: '65%',
        height: screenWidth > 375 ? 50 : 40,
        borderBottomRightRadius: 20,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: 10,
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
    },

    learnArea: {
        fontSize: scaleFontSize(16),
        color: '#2b4353',
        position: 'absolute',
        bottom: 15,
        left: 10,
    },

    number: {
        fontSize: scaleFontSize(20),
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default YearsScreen;

