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
            <Text style={styles.heading}>Überschrift</Text>
            <Text style={styles.description}>Mehr Text der erklärt, worum es in den Lernfeldern geht</Text>
            <View style={styles.buttonContainer}>
                {['Lehrjahr 1', 'Lehrjahr 2', 'Lehrjahr 3'].map((title, index) => (
                    <RenderButton
                        key={index}
                        title={title}
                        onPress={() => onButtonPress(title)}
                        buttonStyle={styles.squareButton}
                        textStyle={styles.topButtonText}
                    />
                ))}
            </View>
            <RenderButton
                title='Alle Lernfelder'
                onPress={() => navigation.navigate('LearnAreas')}
                buttonStyle={styles.ovalButton}
                textStyle={styles.topButtonText}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    newContainer: {
        backgroundColor: '#2b4353',
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#fff',
    },
    description: {
        textAlign: 'center',
        marginBottom: 16,
        color: '#fff',
    },
    buttonContainer: {
        // Style for the container that holds the buttons
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    topButtonText: {
        color: '#f6f5f5',
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center',
    } as TextStyle,
    squareButton: {
        backgroundColor: '#9cd3d380',
        width: 100,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        borderRadius: 5,
    },
    ovalButton: {
        width: 300,
        height: 30,
        backgroundColor: '#e8630a',
        margin: 10,
        borderRadius: 5,
    },
})
export default TopSection;