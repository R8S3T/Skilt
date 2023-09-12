import React from "react";
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Hexagon from "../components/Hexagon";

const data = [
    { id: '1', color: '#2b4353' },
    { id: '2', color: '#2b4353' },
    { id: '3', color: '#2b4353' },
    { id: '4', color: '#2b4353' },
    { id: '5', color: '#2b4353' },
    { id: '6', color: '#e8630a' },
    { id: '7', color: '#e8630a' },
    { id: '8', color: '#e8630a' },
    { id: '9', color: '#e8630a' },
    { id: '10', color: '#e8630a' },
    { id: '11', color: '#9cd3d3' },
    { id: '12', color: '#9cd3d3' },
    { id: '13', color: '#9cd3d3' },
    { id: '14', color: '#9cd3d3' },
    { id: '15', color: '#9cd3d3' },
]

const LearnAreas = () => {
    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <View style={styles.hexagonWrapper}>
                        <Hexagon size={60} color={item.color}>

                        </Hexagon>
                    </View>
                )}
                keyExtractor={item => item.id}
                numColumns={5}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f6f5f5',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    hexagonWrapper: {
        margin: 10,
    },
});

export default LearnAreas;