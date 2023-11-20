import React from'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const LearnScreenComponents = ({ navigation }) => {
    return (
        <View style={styles.background}>
            <View style={styles.row}>
                <TouchableOpacity style={styles.learnAreasButton} onPress={() => navigation.navigate('LearnAreas')}>
                    <View style={styles.buttonContent}>
                        <Text style={styles.buttonText}>Lernfelder</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.learnAreasButton} onPress={() => console.log('Top Left Pressed')}>
                    <View style={styles.buttonContent}>
                        <Text style={styles.buttonText}>Übungen</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.row}>
                <TouchableOpacity style={styles.learnAreasButton} onPress={() => console.log('Top Left Pressed')}>
                    <View style={styles.buttonContent}>
                        <Text style={styles.buttonText}>Prüfungsaufgaben</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.learnAreasButton} onPress={() => console.log('Top Left Pressed')}>
                    <View style={styles.buttonContent}>
                        <Text style={styles.buttonText}>Werkzeugkunde</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#f6f5f5',
        flex: 1,
        justifyContent: 'center',
    },
    learnAreasButton: {
        backgroundColor: '#9cd3d3',
        borderRadius: 20,
        padding: 20,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    hexagonText: {
        textAlign: 'center',
        color: 'white', // or any other color you prefer
        marginTop: 'auto', 
        marginBottom: 'auto', 
        marginLeft: 'auto', 
        marginRight: 'auto'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    box: {
        backgroundColor: 'lightgray',
        padding: 30,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.48,
    }
});

export default LearnScreenComponents;
