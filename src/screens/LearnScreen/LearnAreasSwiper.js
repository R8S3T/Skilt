import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist'; // Ensure this is correctly imported

const LearnAreasSwiper = ({ learningAreas, navigation }) => {
    return (
        <View style={styles.swiperContainer}>
            <SwiperFlatList
                autoplayDelay={2}
                autoplayLoop={false}
                index={0}
                showPagination
            >
                {learningAreas.slice(0, 3).map((area, index) => (
                    <View key={index} style={styles.slide}>
                        <Text style={styles.text}>{area.title}</Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Chapters', { chapterId: area.id })}
                        >
                            <Text>Go to {area.title}</Text>
                        </TouchableOpacity>
                    </View>
                ))}
                <View style={styles.slide}>
                    <TouchableOpacity onPress={() => navigation.navigate('LearnAreas')}>
                        <Text style={styles.text}>Go to All LearnAreas</Text>
                    </TouchableOpacity>
                </View>
            </SwiperFlatList>
        </View>
    );
};

const styles = StyleSheet.create({
    swiperContainer: {
        height: 150,
        width: '100%',
        marginBottom: 10,
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
        width: screenWidth,
    },
})

export default LearnAreasSwiper;
