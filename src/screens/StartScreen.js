import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from 'react-native';
import Logo from '../../assets/Images/logo.png';

const StartScreen = ({ navigation }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate('IntroSlider');
        }, 8000);
        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Image  source={Logo} style={styles.logo}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2b4353',
        alignItems: 'center',
        justifyContent: 'center',
        },
        logo: {
            width: 200,
            height: 200,
            resizeMode: 'contain',
        }
    });

export default StartScreen;