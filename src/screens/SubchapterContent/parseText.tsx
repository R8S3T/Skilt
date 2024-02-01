import React from 'react';
import { Text, View, StyleSheet, TextComponent, Image } from 'react-native';
import { scaleFontSize } from '../../utilities/utils';

interface TextComponentProps {
    content: string;
}

// This function parses the text and returns an array of React elements with applied styles
const parseText = ({ content }: TextComponentProps): JSX.Element[] => {
  return content.split('\n').map((line, index) => {

    // Style for header
    if (line.startsWith('HEADER:')) {
      return <Text key={index} style={styles.header}>{line.replace('HEADER:', '').trim()}</Text>;

    // Style for bullet points
    } else if (line.startsWith('-')) {
      return (
        <View key={index} style={styles.listItem}>
          <Image source={require('../../../assets/Images/bulb.png')} style={styles.bulbIcon} />
          <View style={styles.listItemTextView}>
            <Text style={styles.listItemText}>{line.replace('-', '').trim()}</Text>
          </View>
        </View>
      );
    } else {
      // Apply a general text style for lines that do not start with "HEADER:" or "-"
      return <Text key={index} style={styles.text}>{line}</Text>;
    }
  });
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
      flex: 1, // This ensures text does not go off-screen
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
    }
  });

export default parseText;
