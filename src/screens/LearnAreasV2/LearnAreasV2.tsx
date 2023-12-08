import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LearnStackParamList } from '../../components/LearnStackNavigator';

interface LearnArea {
    id: string;
    title: string;
}

interface EducationYear {
    year: number;
    learnAreas: LearnArea[];
}

interface LearnAreasProps {
    navigation: NativeStackNavigationProp<LearnStackParamList, 'LearnAreas'>;
}

const educationData: EducationYear[] = [
    {
        year: 1,
        learnAreas: [
            { id: '1', title: 'Lernfeld 1' },
            { id: '2', title: 'Lernfeld 2' },
            { id: '3', title: 'Lernfelder 3' },
            { id: '4', title: 'Lernfelder 4' }
        ]
    },
    {
        year: 2,
        learnAreas: [
            { id: '5', title: 'Lernfelder 5' },
            { id: '6', title: 'Lernfelder 6' },
            { id: '7', title: 'Lernfelder 7' },
            { id: '8', title: 'Lernfelder 8' }
        ]
    },
    {
        year: 3,
        learnAreas: [
            { id: '9', title: 'Lernfelder 9' },
            { id: '10', title: 'Lernfelder 10' },
            { id: '11', title: 'Lernfelder 11' },
            { id: '12', title: 'Lernfelder 12' }
        ]
    },
    {
        year: 4,
        learnAreas: [
            { id: '13', title: 'Lernfelder 13' },
            { id: '14', title: 'Lernfelder 14' },
            { id: '15', title: 'Lernfelder 15' },
        ]
    },
];

const LearnAreasV2: React.FC<LearnAreasProps> = ({ navigation }) => {
    const [activeYear, setActiveYear] = useState<number | null>(null);

    const toggleYear = (year: number) => {
        setActiveYear(activeYear === year ? null : year);
    }

    const renderLearnArea = (learnArea: LearnArea) => (
        <TouchableOpacity
            key={learnArea.id}
            onPress={() => navigation.navigate('Subchapters', {subchapterId: learnArea.id})}
            style={styles.learnAreaContainer}
        >
            <Text style={styles.learnAreaText}>{learnArea.title}</Text>
        </TouchableOpacity>
    );

    const renderYear = ({ item }: {item: EducationYear}) => (
        <View style={styles.yearContainer}>
            <TouchableOpacity onPress={() => toggleYear(item.year)} style={styles.yearTitleContainer}>
                <Text style={styles.yearTitle}>{`Year ${item.year}`}</Text>
            </TouchableOpacity>
            {activeYear === item.year && item.learnAreas.map(renderLearnArea)}
        </View>
    );

    return (
        <FlatList
            data={educationData}
            renderItem={renderYear}
            keyExtractor={(item) => item.year.toString()}
            style={styles.container}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    yearContainer: {
        marginBottom: 20,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, // for Android
    },
    yearTitleContainer: {
        padding: 15,
        backgroundColor: '#e7e7e7',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    yearTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    learnAreaContainer: {
        backgroundColor: '#fff',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    learnAreaText: {
        fontSize: 16,
        color: '#555',
    },
});

export default LearnAreasV2;