import React from "react";
import { View, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';

interface Subchapter {
    id: number;
    title: string;
    isLocked: boolean;
}

const subchapters: Subchapter[] = [
    { id: 1, title: 'Technische Zeichnungen', isLocked: false },
    { id: 2, title: 'Bauzeichnungen lesen', isLocked: true },
    { id: 3, title: 'Symbole und Sinnbilder', isLocked: true },
    { id: 4, title: 'Werkstoffe und Baustoffe in unserem Beruf', isLocked: true },
    { id: 5, title: 'Bearbeiten von Metallen mit Handwerkzeugen', isLocked: true },
    { id: 6, title: 'Prüfen', isLocked: true },
    { id: 7, title: 'Kundenauftrag und Arbeitsplanung', isLocked: true },
];

const SubchaptersScreen: React.FC = () => {
    const renderSubchapter = (subchapter: Subchapter) => {
        if (subchapter.isLocked) {
            return (
                <View style={styles.lockButton}>
                    <Image
                        source={require('../../../assets/Images/lock_icon.png')}
                        style={styles.icon}
                    />
                </View>
            );
        } else {
            return (
                <TouchableOpacity style={styles.playButton} onPress={() => console.log('Subchapter pressed')}>
                    <Image
                        source={require('../../../assets/Images/play_icon.png')}
                        style={styles.icon}
                    />
                </TouchableOpacity>
            );
        }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            {subchapters.map((subchapter, index) => (
                <React.Fragment key={subchapter.id}>
                    {index !== 0 && <View style={styles.line} />}
                    {renderSubchapter(subchapter)}
                </React.Fragment>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    contentContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    playButton: {
        // styles for your play button
    },
    lockButton: {
    // styles for your locked subchapter button
    },
    icon: {
        width: 50,
        height: 50,
    },
    line: {
        width: 5,
        height: 100,
        backgroundColor: 'gray',
    },
});

export default SubchaptersScreen;
