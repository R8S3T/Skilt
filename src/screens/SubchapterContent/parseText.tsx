import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { scaleFontSize } from '../../utilities/utils';
import { imageMap } from '../../utilities/imageMappings';

interface TextComponentProps {
    content: string;
}

const parseText = ({ content }: TextComponentProps): JSX.Element[] => {
  const elements = content.split('\n').map((line, index) => {

    // Place image between text
    if (line.startsWith('Image:')) {
      const imageName = line.substring('Image:'.length).trim();
      const imageSource = imageMap[imageName];

      if (imageSource) {
        return <Image key={index} source={imageSource} style={styles.image} />;
      } else {
        console.warn(`Image not found for key: ${imageName}`);
        return null; // Return null if the image is not found
      }
    }
    // Style for HEADER
    if (line.startsWith('HEADER:')) {
      return <Text key={index} style={styles.header}>{line.replace('HEADER:', '').trim()}</Text>;
    
      // Style for bulbs as bullet points
    } else if (line.startsWith('-')) {
      return (
        <View key={index} style={styles.listItem}>
          <Image source={require('../../../assets/Images/bulb.png')} style={styles.bulbIcon} />
          <View style={styles.listItemTextView}>
            <Text style={styles.listItemText}>{line.replace('-', '').trim()}</Text>
          </View>
        </View>
      );

      // Style for italic subheading
    } else if (line.startsWith('*') && line.endsWith('*')) {
      return <Text key={index} style={styles.italicText}>{line.replace(/^\*|\*$/g, '').trim()}</Text>;
    } else {
      return <Text key={index} style={styles.text}>{line}</Text>;
    }
  });

  // Filter out null values
  return elements.filter(element => element !== null) as JSX.Element[];
};


const styles = StyleSheet.create({
  header: {
    fontWeight: 'bold',
    fontSize: scaleFontSize(18),
    fontFamily: 'OpenSans-Regular',
    marginVertical: 10,
    lineHeight: scaleFontSize(22),
    paddingHorizontal: 5,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginLeft: 10,
    marginVertical: 2,
    marginBottom: 10,
  },
  bulbIcon: {
    marginRight: 10,
    width: 20,
    height: 20,
    marginTop: 5,
  },
  listItemTextView: {
    flex: 1,
  },
  listItemText: {
    fontSize: scaleFontSize(14),
    fontFamily: 'OpenSans-Regular',
    lineHeight: scaleFontSize(20),
  },
  text: {
    fontSize: scaleFontSize(14),
    fontFamily: 'OpenSans-Regular',
    lineHeight: scaleFontSize(18),
  },
  italicText: {
    fontSize: scaleFontSize(14),
    fontFamily: 'OpenSans-Regular',
    lineHeight: scaleFontSize(18),
    fontStyle: 'italic', // This applies the italic style
  },
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    marginVertical: 10,
  },
});

export default parseText;

