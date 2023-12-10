import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LearnStackParamList } from '../../components/LearnStackNavigator';
import FlipCardComponent from './FlipCardComponent';
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

    const renderYear = (item: EducationYear, backgroundColor: string) => {
        return (
            <View style={styles.flipCardStyle} key={item.year}>
                <FlipCardComponent
                    year={item.year}
                    learnAreas={item.learnAreas}
                    isActive={activeYear === item.year}
                    backgroundColor={backgroundColor}
                />
            </View>
        );
    };

    return (
        <View style={styles.container}>
<EducationDataComponent>
    {(educationData) => (
        <>
            <View style={styles.row}>
                {educationData.slice(0, 2).map((item) => renderYear(item, "#9cd3d3"))}
            </View>
            <View style={styles.row}>
                {educationData.slice(2, 4).map((item) => renderYear(item, "#2b4353"))}
            </View>
        </>
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
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    flipCardStyle: {
        width: '40%',
        margin: '2%',
        minHeight: 200,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
});

export default LearnAreasV2;
