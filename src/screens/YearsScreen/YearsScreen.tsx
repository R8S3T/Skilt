import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { fetchData } from "../../utilities/fetchData";

interface Chapter {
    ChapterId: number;
    ChapterIntro: string;
}

/* const data = [
    { id: '1', title: 'Bauelemente mit handgeführten Werkzeugen fertigen' },
    { id: '2', title: 'Baugruppen herstellen und montieren' },
    { id: '3', title: 'Technische Systeme instand halten' },
    { id: '4', title: 'Bauelemente mit handgeführten Maschinen fertigen' },
]; */

type YearsScreenRouteProp = RouteProp<{ params: { year: number } }, 'params'>;

const YearsScreen: React.FC = () => {
    const route = useRoute<YearsScreenRouteProp>();
    const [chapters, setChapters] = useState<Chapter[]>([]);
    const selectedYear = route.params.year;

    useEffect(() => {
        const loadChapters = async () => {
            try {
                const year = route.params.year;
                const query = `SELECT ChapterId, ChapterIntro FROM Chapters WHERE Year = ?`;
                const fetchedData = await fetchData<Chapter>(query, [year]);
                setChapters(fetchedData);
            } catch (error) {
                console.error('Error fetching chapters:', error);
            }
        };
        loadChapters();
    }, [selectedYear]);

    const renderItem = ({ item }: { item: Chapter }) => (
        <View style={styles.chapterContainer}>
            <TouchableOpacity onPress={() => console.log('Container pressed')}>

            </TouchableOpacity>
            <Text style={styles.chapterText}>{item.ChapterIntro}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{selectedYear}. Lehrjahr</Text>
            <FlatList
                data={chapters}
                renderItem={renderItem}
                keyExtractor={(item) => item.ChapterId.toString()}
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