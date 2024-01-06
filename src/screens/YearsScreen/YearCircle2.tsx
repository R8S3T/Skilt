import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import { screenWidth } from "../../utilities/utils";

interface YearCircleProps {
    year: number;
    color: string;
}

const YearCircle: React.FC<YearCircleProps> = ({ year, color }) => {
    return (
      <View style={[styles.yearContainer, { backgroundColor: color }]}>
        <Text style={styles.yearText}>{`${year}. Lehrjahr`}</Text>
      </View>
    );
};

const styles = StyleSheet.create({
  yearContainer: {
    paddingHorizontal: screenWidth * 0.05, // Adjust padding as needed
    paddingVertical: screenWidth * 0.02, // Adjust padding as needed
    borderBottomRightRadius: 20, // Adjust radius as needed
    borderTopLeftRadius: 0, // Ensure top-left corner is not rounded
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#ffffff',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1, // Ensure it stacks above other elements if necessary
  },
  yearText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: screenWidth * 0.05, // Adjust font size as needed
  },
});

export default YearCircle;
