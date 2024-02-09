import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { useSubchapter } from '../SubchaptersScreen/SubchapterContext';

const CongratsScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    const { setCurrentSubchapter } = useSubchapter();

    const handleContinue = () => {
        console.log('handleContinue called');
        setCurrentSubchapter(null, '');
        console.log('Navigating to SubchaptersScreen');
        navigation.navigate('SubchaptersScreen');
    };

    return (
        <View style={styles.container}>
            <LottieView
                source={require('../../../assets/Animations/congrats_1.json')}
                autoPlay
                loop={false}
                style={styles.animation}
            />
            <Button title='Weiter' onPress={handleContinue}></Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    animation: {
        width: 500,
        height: 500,
    },
});

export default CongratsScreen;
