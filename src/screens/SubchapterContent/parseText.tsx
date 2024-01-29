import React from "react";
import { Text, View, StyleSheet, TextComponent } from 'react-native';


interface TextComponentProps {
    content: string;
}

// This function parses the text and returns an array of React elements with applied styles
const parseText = ({ content }) => {
    return content.split('\n').map((line, index) => {
      if (line.startsWith('HEADER:')) {
        // Remove "HEADER:" and apply header styling
        return <Text key={index} style={styles.header}>{line.replace('HEADER:', '').trim()}</Text>;
      } else if (line.startsWith('-')) {
        // Remove "-" and apply list item styling
        return (
          <View key={index} style={styles.listItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.listItemText}>{line.replace('-', '').trim()}</Text>
          </View>
        );
      } else {
        return <Text key={index}>{line}</Text>;
      }
    });
  };


  const styles = StyleSheet.create({
    header: {
      fontWeight: 'bold',
      fontSize: 18,
      marginVertical: 10,
    },
    listItem: {
      flexDirection: 'row', // Ensures that the bullet point and text are laid out horizontally
      marginLeft: 10,
      alignItems: 'center', // Aligns the bullet point and text vertically
      fontSize: 16,
      marginVertical: 2,
    },
    bulletPoint: {
      marginRight: 10, // Adds some space between the bullet point and the text
    },
    listItemText: {
      flex: 1, // Takes up the remaining space in the flex direction to ensure text alignment
      fontSize: 16, // Matches the fontSize of listItem for consistency
      // Add any additional text styling here
    },
    // Add other styles as needed
  });

export default parseText;
