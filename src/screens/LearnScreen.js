import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Hexagon from "../components/Hexagon";



const  LearnScreen = ({ navigation }) => {
    return (
        <View style={styles.background}>
            <View style={styles.row}>
                <TouchableOpacity style={{ margin: 10 }} onPress={() => navigation.navigate('LearnAreas')}>
                    <Hexagon size={120} color="#b6e1e0">
                        <Text style={styles.hexagonText}>Lernfelder</Text>
                    </Hexagon>
                </TouchableOpacity>
                <TouchableOpacity style={{ margin: 30 }} onPress={() => console.log('Top Left Pressed')}>
                    <Hexagon size={150} color="#9cd3d3">
                        <Text style={styles.hexagonText}>Übungen</Text>
                    </Hexagon>
                </TouchableOpacity>
            </View>

            <View style={styles.row}>
                <TouchableOpacity style={{ margin: 5 }} onPress={() => console.log('Top Left Pressed')}>
                    <Hexagon size={145} color="#9cd3d3">
                        <Text style={styles.hexagonText}>Prüfungsaufgaben</Text>
                    </Hexagon>
                </TouchableOpacity>
                <TouchableOpacity style={{ margin: 40 }} onPress={() => console.log('Top Left Pressed')}>
                    <Hexagon size={130} color="#b6e1e0">
                        <Text style={styles.hexagonText}>Werkzeugkunde</Text>
                    </Hexagon>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    hexagonText: {
        textAlign: 'center',
        color: 'white', // or any other color you prefer
        marginTop: 'auto', 
        marginBottom: 'auto', 
        marginLeft: 'auto', 
        marginRight: 'auto'
    },
    background: {
        backgroundColor: '#f6f5f5',
        flex: 1,
        justifyContent: 'center',
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

export default LearnScreen;