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
        const backgroundColors = ['#9ba6a5', '#2b4353', '#e8630a', '#a8d1d1'];
        const globalIndex = item.year - 1;

        return (
            <TouchableOpacity
                key={item.year.toString()}
                style={[styles.card]}
                onPress={() => navigation.navigate('ChaptersScreen', { year: item.year })}
            >
                <View style={[styles.yearRectangle, { backgroundColor: backgroundColors[globalIndex] }]}>
                    <Text style={styles.number}>{`${item.year}. Lehrjahr`}</Text>
                </View>
                <Text style={styles.learnArea}>
                    {`${item.learnAreas.length} Lernfelder`}
                </Text>
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
        alignItems: 'center',
    },
    header: {
        fontSize: 28,
        color: '#2b4353',
        fontFamily: 'Lato-Bold',
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    card: {
        width: '85%',
        minHeight: dynamicCardHeight(85, 120),
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        marginTop: 15,
        marginBottom: 25,
        overflow: 'hidden',
        paddingTop: 0,
        paddingBottom: 30,
        paddingHorizontal: 20,
    },
    yearRectangle: {
        width: '75%',
        height: screenWidth > 375 ? 45 : 35,
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
        fontFamily: 'OpenSans-Regular',
        fontSize: scaleFontSize(14),
        color: '#2b4353',
        position: 'absolute',
        bottom: 10,
        left: 10,
    },
    number: {
        fontFamily: 'Lato-Bold',
        fontSize: scaleFontSize(18),
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default YearsScreen;

