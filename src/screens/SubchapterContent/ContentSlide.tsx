import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import ContentWithExplanations from "../../components/ContentWithExplanations";
import parseText from './parseText';
import { imageMap } from '../../utilities/imageMappings';

interface ContentSlideProps {
    contentData: {
        ContentData: string;
        scContentId: number;
        imagePaths?: string[];
    };
}

const ContentSlide: React.FC<ContentSlideProps> = ({ contentData }) => {
    const { ContentData, scContentId, imagePaths } = contentData;
    const styledContent = parseText({ content: ContentData });

    return (
        <View style={styles.slide}>
            <ContentWithExplanations
                content={styledContent}
                contentId={scContentId}
            />
            {imagePaths && imagePaths.map((key, index) => {
                const image = imageMap[key];

                if (!image) {
                    console.log('Image not found for key:', key);
                    return null;
                }

                return (
                    <Image
                        key={index}
                        source={image}
                        style={styles.image}
                    />
                );
            })}
        </View>
    );
};


const styles = StyleSheet.create({
    slide: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: 20,
    },
    image: {
        width: '100%',
        height: 100,
        resizeMode: 'contain',
        marginVertical: 10,
        marginTop: 80,
    },
});

export default ContentSlide;
