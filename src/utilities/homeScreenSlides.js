import React from 'react';
import LottieView from 'lottie-react-native';
import { TextInput } from 'react-native-gesture-handler';
import { View, Text, StyleSheet } from 'react-native';


const slides = [
    {
        key: 'one',
        animation: require('../../assets/Animations/fireworks_animation.json'),
        title: 'Willkommen bei Skilt',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet nisl suscipit adipiscing bibendum est. ',
        backgroundColor: '#f6f5f5',
    },
    {
        key: 'two',
        animation: require('../../assets/Animations/knowledge_donut_animation.json'),
        title: 'Lernen mit kleinen Wissens-Häppchen',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet nisl suscipit adipiscing bibendum est. ',
        backgroundColor: '#f6f5f5',
    },
    {
        key: 'three',
        animation: require('../../assets/Animations/quiz_animation_3.json'),
        title: 'Interaktive Quizzes',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet nisl suscipit adipiscing bibendum est. ',
        backgroundColor: '#f6f5f5',
    },
    {
        key: 'four',
        animation: require('../../assets/Animations/user_animation_2.json'),
        title: 'Benutzername',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. ',
        backgroundColor: '#f6f5f5',
        renderInputField: true,
    },
];

function renderSlideItem(item, setName) {
    if (item.renderInputField) {
        return (
            <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
                <LottieView
                    source={item.animation}
                    style={styles.animation}
                    autoPlay
                    loop
                />
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.text}>{item.text}</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Dein Name'
                    onChangeText={text => setName(text)}
                />
            </View>
        );
    } else {
        return (
            <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
                <LottieView source={item.animation} style={styles.animation} />
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.text}>{item.text}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    animation: {
        width: 150,
        height: 150,
        alignSelf: 'center',
    },
    title: {
        fontSize: 18,
        color: '#000',
        textAlign: 'center',
        marginVertical: 10,
    },
    text: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 20,
        width: '80%',
        alignSelf: 'center',
    }
});

export { slides, renderSlideItem };