import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import YearComponent from './YearComponent';
import LearnAreaComponent from './LearnAreaComponent';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LearnStackParamList } from '../../components/LearnStackNavigator';
import CircleOverlay from './CircleOverlay';

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
        setActiveYear((currentActiveYear) => currentActiveYear === year ? null : year);
    }

    const renderYear = ({ item }: { item: EducationYear }) => {
        console.log('Rendering year:', item.year, 'isActive:', activeYear === item.year);
        return (
            <YearComponent
            year={item.year}
            isActive={activeYear === item.year}
            onPress={() => toggleYear(item.year)}
            >
                {item.learnAreas.map((learnArea) => (
                    <LearnAreaComponent
                        key={learnArea.id}
                        id={learnArea.id}
                        title={learnArea.title}
                        onPress={() => navigation.navigate('Subchapters', { subchapterId: learnArea.id })}
                    />
                ))}
            </YearComponent>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={educationData}
                renderItem={renderYear}
                keyExtractor={(item) => item.year.toString()}
                style={styles.container}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
    },
});

export default LearnAreasV2;