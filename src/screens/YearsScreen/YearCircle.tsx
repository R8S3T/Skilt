import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import { screenWidth } from "../../utilities/utils";

interface YearCircleProps {
    year: number;
    color: string;
}

const YearCircle: React.FC<YearCircleProps> = ({ year, color }) => {
    return (
        <View style={[styles.outerCircle, { backgroundColor: color }]}>
            <View style={[styles.innerCircle, { backgroundColor: color }]}>
                <Text style={styles.yearText}>{year}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
  outerCircle: {
    width: screenWidth * 0.25,
    height: screenWidth * 0.25,
    borderRadius: screenWidth * 0.25 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#ffffff',
    backgroundColor: 'transparent',
  },
  innerCircle: {
    width: screenWidth * 0.18,
    height: screenWidth * 0.18,
    borderRadius: screenWidth * 0.20 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  yearText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: screenWidth * 0.075,
  },
});

export default YearCircle;
