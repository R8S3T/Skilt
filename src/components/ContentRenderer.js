import React from "react";
import { View, Text, StyleSheet } from 'react-native';

const ContentRenderer = ({ ContentData }) => {
    return (
        <View style={StyleSheet.slide}>
            <Text>{ContentData}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    }
});

export default ContentRenderer;