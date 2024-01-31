import React from 'react';
import { Text, View, StyleSheet, TextComponent } from 'react-native';
import { scaleFontSize } from '../../utilities/utils';

interface TextComponentProps {
    content: string;
}

// This function parses the text and returns an array of React elements with applied styles
const parseText = ({ content }: TextComponentProps): JSX.Element[] => {
  return content.split('\n').map((line, index) => {
    if (line.startsWith('HEADER:')) {
      return <Text key={index} style={styles.header}>{line.replace('HEADER:', '').trim()}</Text>;
    } else if (line.startsWith('-')) {
      return (
        <View key={index} style={styles.listItem}>
          <Text>
            <Text style={styles.bulletPoint}>• </Text>
            <Text style={styles.listItemText}>{line.replace('-', '').trim()}</Text>
          </Text>
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
    },
    listItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 10,
      marginVertical: 2,
      marginBottom: 10,
    },
    bulletPoint: {
      marginRight: 10,
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
