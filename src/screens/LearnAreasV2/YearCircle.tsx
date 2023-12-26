// YearCircle.tsx
import React from "react";
import { View, Text, StyleSheet } from 'react-native';

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
    width: 110,
    height: 110,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#ffffff',
    backgroundColor: 'transparent',
  },
  innerCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3, // Adjust the border width as necessary
    borderColor: '#ffffff', // White border for the inner circle
  },
  yearText: {
    color: '#ffffff', // White text color
    fontWeight: 'bold',
    fontSize: 30,
  },
});

export default YearCircle;
