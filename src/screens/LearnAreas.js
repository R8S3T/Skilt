import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Hexagon3D from "../components/Hexagon3D";
import Hexagon from "../components/Hexagon";
import { learnGroups } from "../components/learnGroups";
import { lightenColor } from "../utililities/lightenColor";

const LearnAreas = ({ navigation }) => {

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Lernen'
        });
    }, [navigation]);

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
                    <View style={[
                        styles.hexagonTextBackground, 
                        { backgroundColor: lightenColor(item.color, 5) }  // lightens color by 20%
                    ]} />
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
                        style={styles.hexagonWrapper}
                    >
                        <Hexagon size={60} color={item.color} />
                        <View style={[
                            styles.hexagonTextBackground, 
                            { backgroundColor: lightenColor(item.color, 5) }  // lightens color by 20%
                        ]} />
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
        fontSize: 23,
        alignSelf: 'center',
        top: '30%',
/*         textShadowColor: 'rgba(0, 0, 0, 0.75)', // Black shadow with 75% opacity
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 2, */
    },
    hexagonTextBackground: {
        position: 'absolute',
        alignSelf: 'center',
        top: '30%',
        width: 30,
        height: 30,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    }
    
});

export default LearnAreas;