import React from "react";
import { View, Text, StyleSheet } from 'react-native';

const SettingsScreen = () => {
    return (
        <View style={styles.background}>
            <Text>Settings Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#f6f5f5',
        flex: 1
    }
});

export default SettingsScreen;