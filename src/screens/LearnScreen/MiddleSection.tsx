import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { LearnStackParamList } from '../../components/LearnStackNavigator'


interface MiddleSectionProps {
    onButtonPress: (title: string) => void;
}
const MiddleSection: React.FC<MiddleSectionProps> = ({ onButtonPress }) => {
    const navigation = useNavigation<NavigationProp<LearnStackParamList>>();

    const handlePress = () => {
        console.log('Übungen button pressed');
    };

    return (
        <TouchableOpacity
        style={styles.container}
        onPress={handlePress}
        activeOpacity={0.7}
        >
            <View style={styles.textContainer}>
                <Text style={styles.title}>Übungen</Text>
                <Text style={styles.subtitle}>Teste Dein Wissen</Text>
            </View>
            <Image
                source={require('../../../assets/Images/wrench.png')}
                style={styles.image}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: 349,
        height: 100,
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 20,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    textContainer: {
        justifyContent: 'center',
    },
    title: {
        color: '#2b4353',
        fontFamily: 'Montserrat-Bold',
        fontSize: 20,
        textAlign: 'left',
        marginBottom: 5,
    },
    subtitle: {
        color: '#2b4353',
        fontFamily: 'Montserrat-Alternates-Medium',
        fontSize: 16,
        textAlign: 'left',
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 20,
        resizeMode: 'contain',
    },
})
export default MiddleSection;
