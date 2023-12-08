import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Hexagon from "./Hexagon";

const ClickableHexagon = ({ id, color, text, onPress }) => {
    return (
        <TouchableOpacity
            style={StyleSheet.hexagonWrapper}
            onPress={() => onPress(id)}
        >
            <Hexagon size={60} color={color}>
                <Text style={styles.hexagonText}>{text}</Text>
            </Hexagon>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    hexagonWrapper: {
        margin: 10,
    },
    hexagonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default ClickableHexagon;