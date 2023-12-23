import React from "react";
import { View, Text, StyleSheet, TextStyle } from 'react-native';
import RenderButton from "./RenderButton";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { LearnStackParamList } from '../../components/LearnStackNavigator'

interface TopSectionProps {
    onButtonPress: (title: string) => void;
}

const TopSection: React.FC<TopSectionProps> = ({ onButtonPress }) => {
    const navigation = useNavigation<NavigationProp<LearnStackParamList>>();

    return (
        <View style={styles.newContainer}>
            <Text style={styles.heading}>Meistere Dein Handwerk</Text>
            <Text style={styles.description}>Vertiefe Dein Wissen mit maßgeschneiderten Lernhäppchen, die auf deine Ausbildung abgestimmt sind. </Text>
            <RenderButton
                title='Starte hier'
                onPress={() => navigation.navigate('LearnAreas')}
                buttonStyle={styles.ovalButton}
                textStyle={styles.topButtonText}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    newContainer: {
        backgroundColor: '#ffffff',
        padding: 20,
        width: 349,
        height: 213,
        borderRadius: 5,
        marginBottom: 5,
        alignItems: 'flex-start',
    },
    heading: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#2b4353',
        textAlign: 'left',
        width: '100%',
    },
    description: {
        fontFamily: 'Montserrat-Alternates-Medium',
        fontSize: 16,
        textAlign: 'left',
        color: '#2b4353',
        width: '100%',
        marginBottom: 15,
    },
    ovalButton: {
        width: 315,
        height: 40,
        backgroundColor: '#e8630a',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    topButtonText: {
        color: '#f6f5f5',
        fontWeight: 'bold',
        fontSize: 18,
    } as TextStyle,
});

export default TopSection;