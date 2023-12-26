import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";

const data = [
    { id: '1', title: 'Bauelemente mit handgeführten Werkzeugen fertigen' },
    { id: '2', title: 'Baugruppen herstellen und montieren' },
    { id: '3', title: 'Technische Systeme instand halten' },
    { id: '4', title: 'Bauelemente mit handgeführten Maschinen fertigen' },
];

const YearsScreen = () => {
    const navigation = useNavigation();

    const renderItem = ({ item }) => (
        <View style={styles.chapterContainer}>
            <TouchableOpacity onPress={() => console.log('Container pressed')}>

            </TouchableOpacity>
            <Text style={styles.chapterText}>{item.title}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>1. Lehrjahr</Text>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
            </View>
        );
    };

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: 'transparent',
    },
    header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: 'black',
    },
    chapterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: 'yourBorderColor',
    borderRadius: 10,
    backgroundColor: 'transparent',
    },
    chapterText: {
    marginLeft: 10,
    color: 'black',
    },
});

export default YearsScreen;