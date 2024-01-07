import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useRoute, RouteProp, useNavigation, NavigationProp } from "@react-navigation/native";
import { fetchData } from "../../utilities/fetchData";
import { scaleFontSize, dynamicCardHeight, getDynamicIconSize } from "../../utilities/utils";
import { LearnStackParamList } from "../../components/LearnStackNavigator";


interface Chapter {
    ChapterId: number;
    ChapterIntro: string;
}

type ChaptersScreenRouteProp = RouteProp<{ ChaptersScreen: { year: number } }, 'ChaptersScreen'>;

const ChaptersScreen: React.FC = () => {
    const route = useRoute<ChaptersScreenRouteProp>();
    const [chapters, setChapters] = useState<Chapter[]>([]);
    const selectedYear = route.params.year;
    const iconSize = getDynamicIconSize(40, 50);
    const navigation = useNavigation<NavigationProp<LearnStackParamList>>();

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
            <TouchableOpacity
                style={styles.playButton}
                onPress={() => navigation.navigate('SubchaptersScreen', { chapterId: item.ChapterId, chapterTitle: item.ChapterIntro })}>
            <Image
                source={require('../../../assets/Images/play.png')}
                style={{ width: iconSize, height: iconSize, tintColor: '#e8630a' }}
            />
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
        fontFamily: 'Lato-Bold',
        fontSize: scaleFontSize(22),
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
        color: '#2b4353',
    },
    chapterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 18,
        marginTop: 20,
        margin: 18,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#2b4353',
        borderRadius: 10,
        backgroundColor: 'transparent',
        height: dynamicCardHeight(95, 110),
    },
    chapterText: {
        flex: 1,
        marginLeft: 28,
        fontFamily: 'OpenSans-Regular',
        color: '#2b4353',
        fontSize: scaleFontSize(13),
    },

    playButton: {
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ChaptersScreen;

