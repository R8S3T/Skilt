import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Hexagon from "../components/Hexagon";
import { learnGroups } from "../components/learnGroups";

const LearnAreas = ({ navigation }) => {

    const handleHexagonPress = (id) => {
        console.log(`Chapter with ID ${id} pressed`);
        navigation.navigate('Chapters', { chapterId: id })
    };

    const renderGroup = ({ item }) => (
        <View style={styles.groupContainer}>

            <View style={styles.topRow}>
                {item.items.slice(0, 3).map(id => (
                    <TouchableOpacity
                        key={id}
                        onPress={() => handleHexagonPress(id)}
                        style={styles.hexagonWrapper}
                    >
                        <Hexagon size={60} color={item.color} />
                        <Text style={styles.hexagonText}>{id}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.textLabel}>
                <Text style={styles.backgroundText}>{item.text}</Text>
            </View>

            <View style={styles.bottomRow}>
                {item.items.slice(3).map(id => (
                    <TouchableOpacity
                        key={id}
                        onPress={() => handleHexagonPress(id)}
                        style={styles.hexagonWrapperBottom}
                    >
                        <Hexagon size={60} color={item.color} />
                        <Text style={styles.hexagonText}>{id}</Text>
                    </TouchableOpacity>
                ))}
            </View>

        </View>
    );
    return (
        <View style={styles.container}>
            <FlatList
                data={learnGroups}
                renderItem={renderGroup}
                keyExtractor={item => item.color}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f6f5f5',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    hexagonWrapper: {
        margin: 18,
    },
    hexagonWrapperBottom: {
        marginHorizontal: 25, // space between bottom row hexagon
        marginVertical: 8,
    },
    groupContainer: {
        width: 300,
        height: 250,
        marginBottom: 30,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    backgroundText: {
        position: 'absolute', //This will place text behind hexagons
        zIndex: -1,
        fontSize: 35,
        color: 'rgba(0, 0, 0, 0.15)', // slightly faded text
        alignSelf: 'center',
        marginVertical: 1,
    },
    textLabel: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 10,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    hexagonText: {
        position: 'absolute',
        color: '#f6f5f5',
        fontWeight: 'bold',
        fontSize: 20,
        alignSelf: 'center',
        top: '30%',
    }
});

export default LearnAreas;