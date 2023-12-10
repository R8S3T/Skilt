import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import YearComponent from './YearComponent';
import LearnAreaComponent from './LearnAreaComponent';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LearnStackParamList } from '../../components/LearnStackNavigator';
import EducationDataComponent from './EducationDataComponent';


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

const LearnAreasV2: React.FC<LearnAreasProps> = ({ navigation }) => {
    const [activeYear, setActiveYear] = useState<number | null>(null);

    // Active year button and show learnareas
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
            <EducationDataComponent>
                {(educationData) => (
                    <FlatList
                        data={educationData}
                        renderItem={renderYear}
                        keyExtractor={(item) => item.year.toString()}
                        style={styles.container}
                    />
                )}
            </EducationDataComponent>
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