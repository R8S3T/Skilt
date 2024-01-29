import React from 'react';
import { View, StyleSheet } from 'react-native';
import ContentWithExplanations from "../../components/ContentWithExplanations";
import parseText from './parseText'; // Import parseText

interface ContentSlideProps {
    contentData: {
        ContentData: string;
        scContentId: number;
    };
}

const ContentSlide: React.FC<ContentSlideProps> = ({ contentData }) => {
    // Use parseText to process and style the content
    const styledContent = parseText({ content: contentData.ContentData });

    return (
        <View style={styles.slide}>
            <ContentWithExplanations
                content={styledContent}
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
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
});

export default ContentSlide;
