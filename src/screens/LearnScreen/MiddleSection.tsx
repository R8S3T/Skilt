import React from 'react';
import { View, StyleSheet, TextStyle } from 'react-native';
import RenderButton from './RenderButton';
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { LearnStackParamList } from '../../components/LearnStackNavigator'


interface MiddleSectionProps {
    onButtonPress: (title: string) => void;
}
const MiddleSection: React.FC<MiddleSectionProps> = ({ onButtonPress }) => {
    const navigation = useNavigation<NavigationProp<LearnStackParamList>>();

    return (
        <View style={styles.buttonContainer}>
            <RenderButton
                title='Übungen'
                onPress={() => navigation.navigate('LearnAreasHex')}
                buttonStyle={styles.imageButton}
                textStyle={styles.middleButtonText}
                imageSource={require('../../../assets/Images/book.png')}
            />
            <RenderButton
                title='Werkzeugkunde'
                onPress={() => onButtonPress('Werkzeugkunde')}
                buttonStyle={styles.imageButton}
                textStyle={styles.middleButtonText}
                imageSource={require('../../../assets/Images/wrench.png')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        // Style for the container that holds the buttons
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    imageButton: {
        alignItems: 'center',
        backgroundColor: '#fff',
        width: 150,
        height: 120,
        justifyContent: 'center',
        margin: 20,
        borderRadius: 5,

        // Shadow properties for iOS
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        // elevation for Android
        elevation: 5,
    },
    middleButtonText: {
        color: '#2b4353',
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center',
    } as TextStyle,
})
export default MiddleSection;
