import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { fetchData } from "../../utilities/fetchData";

interface Chapter {
    ChapterId: number;
    ChapterIntro: string;
}

type ChaptersScreenRouteProp = RouteProp<{ ChaptersScreen: { year: number } }, 'ChaptersScreen'>;

const ChaptersScreen: React.FC = () => {
    const route = useRoute<ChaptersScreenRouteProp>();
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
        color: '#2b4353',
    },
    chapterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 18,
        marginVertical: 5,
        margin: 18,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#2b4353',
        borderRadius: 10,
        backgroundColor: 'transparent',
    },
    chapterText: {
        marginLeft: 35,
        fontFamily: 'Montserrat-Medium',
        color: '#2b4353',
    },
});

export default ChaptersScreen;