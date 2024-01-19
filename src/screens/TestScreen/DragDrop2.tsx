import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import Draggable from "./Draggable";

export default class DragDrop2 extends Component {
    render() {
        return (
        <View style={styles.mainContainer}>
            <Text style={styles.questionText}>
            The largest planet in our solar system is
            <View style={styles.dropZone} />
            and the smallest is
            <View style={styles.dropZone} />.
            </Text>
            <View style={styles.row}>
            <Draggable />
            <Draggable />
            <Draggable />
            <Draggable />
            </View>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    questionText: {
        fontSize: 18,
        textAlign: 'center',
        margin: 10,
    },
    dropZone: {
        height: 40,
        width: 100,
        marginHorizontal: 5,
        backgroundColor: "#00334d",
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        flexDirection: "row",
        marginTop: 20,
    },
    text: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold"
    },
    });



