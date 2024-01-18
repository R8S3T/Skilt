import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import Draggable from "./Draggable";

export default class DragDrop2 extends Component {
    render() {
        return (
        <View style={styles.mainContainer}>
            <View style={styles.dropZone}>
            <Text style={styles.text}>Drop them here!</Text>
            </View>
            <View style={styles.ballContainer} />
            <View style={styles.row}>
            <Draggable />
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
        flex: 1
    },
    ballContainer: {
        height: 200,
        width: 300,
    },
    row: {
        flexDirection: "row"
    },
    dropZone: {
        height: 200,
        width: 300,
        backgroundColor: "#00334d",
        margin: 50,
    },
    text: {
        marginTop: 25,
        marginLeft: 5,
        marginRight: 5,
        textAlign: "center",
        color: "#fff",
        fontSize: 25,
        fontWeight: "bold"
    }
});



