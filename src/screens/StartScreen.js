import React, { useEffect } from "react";
import { View, Text, StyleSheet } from 'react-native';

const StartScreen = ({ navigation }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate('MainApp');
        }, 2000);
        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={styles.container}>
        <Text>Starting Screen</Text>
        <Text>Animated Logo coming</Text>
        <Text>Welcome to Skilt</Text>
        <Text>Starting Screen disappears after 2 -3 seconds</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        },
    });

export default StartScreen;