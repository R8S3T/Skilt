import { Dimensions } from 'react-native';

// Function to calculate screen size
export const screenWidth = Dimensions.get('window').width;

// Function to calculate fontsize
export const scaleFontSize = (size: number): number => {
    const scale = screenWidth / 320;
    return Math.round(size * scale);
};

// Function to calculate dynamic margin
export const dynamicMargin = (smallMargin: number, largeMargin: number): number => {
    return screenWidth > 375 ? largeMargin : smallMargin;
};

export const dynamicCardHeight = (smallHeight: number, largeHeight: number): number => {
    const screenWidth = Dimensions.get('window').width;
    return screenWidth > 375 ? largeHeight : smallHeight;
};
