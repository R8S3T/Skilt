import React from 'react';
import { View, StyleSheet } from 'react-native';
import ContentWithExplanations from "../../components/ContentWithExplanations";

interface ContentSlideProps {
    contentData: {
        ContentData: string;
        scContentId: number;
    };
}
const ContentSlide: React.FC<ContentSlideProps> = ({ contentData }) => {
    return (
        <View style={styles.slide}>
            <ContentWithExplanations
                content={contentData.ContentData}
                contentId={contentData.scContentId}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
});

export default ContentSlide;