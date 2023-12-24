import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
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
    const [educationData] = useState<EducationYear[]>([
        // Mock data; replace with your actual data source
        { year: 1, learnAreas: [{ id: '1', title: 'Area 1' }] },
        { year: 2, learnAreas: [{ id: '2', title: 'Area 2' }] },
        { year: 3, learnAreas: [{ id: '3', title: 'Area 3' }] },
        { year: 4, learnAreas: [{ id: '4', title: 'Area 4' }] },
    ]);

    const renderYear = (item: EducationYear, globalIndex: number) => {
        const backgroundColors = ['#7accc8', '#f4b400', '#db4437', '#1a73e8'];
        return (
            <TouchableOpacity 
                style={styles.card}
                key={item.year.toString()}
                onPress={() => console.log(`Year ${item.year} pressed`)}
            >
                <YearCircle
                    year={item.year}
                    backgroundColor={backgroundColors[globalIndex]}
                />
                <Text style={styles.description}>
                    {`${item.learnAreas.length} Lernfelder`}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Wähle Dein Lehrjahr</Text>
            <View style={styles.row}>
                {educationData.slice(0, 2).map((item, index) =>
                    renderYear(item, index))
                }
            </View>
            <View style={styles.row}>
                {educationData.slice(2, 4).map((item, index) =>
                    renderYear(item, index + 2)) // index + 2 to continue the global index
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    card: {
        width: '48%',
        marginHorizontal: '1%',
        minHeight: 200,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderWidth: 5,
        // borderColor will be set dynamically
    },
    circle: {
        width: 70,
        height: 70,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    number: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    description: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
});

export default LearnAreasV2;

