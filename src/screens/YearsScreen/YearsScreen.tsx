import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { dynamicMargin } from '../../utilities/utils';
import EducationDataComponent from './EducationDataComponent';
import { useNavigation } from '@react-navigation/native';
import YearCircle from './YearCircle';

interface LearnArea {
    id: string;
    title: string;
}

interface EducationYear {
    year: number;
    learnAreas: LearnArea[];
}

const LearnAreasV2: React.FC = () => {
    const navigation = useNavigation();

    const renderYear = (item: EducationYear, globalIndex: number) => {
        const backgroundColors = ['#6d93ac', '#8fc2c2', '#eab088', '#d5949d'];

        return (
            <View style={[styles.card, { borderColor: backgroundColors[globalIndex] }]} key={item.year.toString()}>
                <View style={styles.circleContainer}>
                    <YearCircle year={item.year} color={backgroundColors[globalIndex]} />
                </View>
                <TouchableOpacity
                    style={[styles.learnArea, { backgroundColor: backgroundColors[globalIndex] }]}
                    onPress={() => navigation.navigate('YearsScreen', { year: item.year })}
                >
                    <Text style={styles.description}>{`${item.learnAreas.length} Lernfelder`}</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <EducationDataComponent>
            {educationData => (
                <ScrollView style={styles.scrollView}>
                    <View style={styles.container}>
                        <Text style={styles.header}>Wähle Dein Lehrjahr</Text>
                        <View style={styles.row}>
                            {educationData.slice(0, 2).map((item, index) => renderYear(item, index))}
                        </View>
                        <View style={styles.row}>
                            {educationData.slice(2, 4).map((item, index) => renderYear(item, index + 2))}
                        </View>
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
        width: '46%',
        marginHorizontal: '1%',
        minHeight: 220,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'transparent',
        borderWidth: 2,
        marginBottom: 10,
        overflow: 'hidden',
    },
    circleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    circle: {
        width: 110,
        height: 110,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    learnArea: {
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 1,
        borderColor: '#ffffff',
    },
    description: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    number: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default LearnAreasV2;

