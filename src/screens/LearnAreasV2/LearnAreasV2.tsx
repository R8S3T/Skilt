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
                            {educationData.slice(0, 2).map((item, index) => 
                                renderYear(item, (index === 0) ? '#2b4353' : '#9cd3d3'))
                            }
                        </View>
                        <View style={styles.row}>
                            {educationData.slice(2, 4).map((item, index) => 
                                renderYear(item, (index === 0) ? '#9cd3d3' : '#2b4353'))
                            }
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
        padding: 10, // Add padding to the container for spacing
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between', // This will space out the cards evenly
        marginBottom: 10, // Margin between rows
    },
    flipCardStyle: {
        width: '48%', // Adjust width if needed
        marginHorizontal: '1%', // Horizontal margin for spacing between cards
        minHeight: 200,
        borderRadius: 10, // Rounded corners
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        backgroundColor: '#fff', // Default background color, can be overridden
    },
});

export default LearnAreasV2;
