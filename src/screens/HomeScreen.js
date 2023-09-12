import React from "react";
import { View, Text, StyleSheet } from 'react-native';

const HomeScreen = () => {
    return (
        <View style={styles.background}>
            <Text>Home Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#f6f5f5',
        flex: 1
    }
});

export default HomeScreen;