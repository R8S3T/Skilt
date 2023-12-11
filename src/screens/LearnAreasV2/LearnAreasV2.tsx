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

    // Function to compute the global index
    const getGlobalIndex = (rowIndex: number, index: number): number => {
        return rowIndex * 2 + index;
    };

    const renderYear = (item: EducationYear, globalIndex: number) => {
        let backgroundImg;

        switch (globalIndex) {
            case 0:
                backgroundImg = require('../../../assets/Images/fabric.png');
                break;
            case 1:
                backgroundImg = require('../../../assets/Images/asfalt-dark.png');
                break;
            case 2:
                backgroundImg = require('../../../assets/Images/noise-lines.png');
                break;
            case 3:
                backgroundImg = require('../../../assets/Images/gray-lines.png');
                break;
            // Add default case if needed
        }

        return (
            <View style={styles.flipCardStyle} key={item.year}>
            <FlipCardComponent
                year={item.year}
                learnAreas={item.learnAreas}
                isActive={activeYear === item.year}
                backgroundImg={backgroundImg}
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
                                renderYear(item, getGlobalIndex(0, index)))
                            }
                        </View>
                        <View style={styles.row}>
                            {educationData.slice(2, 4).map((item, index) => 
                                renderYear(item, getGlobalIndex(1, index)))
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
        padding: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    flipCardStyle: {
        width: '48%',
        marginHorizontal: '1%',
        minHeight: 200,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        backgroundColor: '#fff',
        borderWidth: 5,       // Thickness of the border
        borderColor: '#71a0a5',  // Color of the border
    },
});

export default LearnAreasV2;
