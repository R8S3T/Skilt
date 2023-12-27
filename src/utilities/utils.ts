import { Dimensions } from 'react-native';

export const screenWidth = Dimensions.get('window').width;

export const scaleFontSize = (size: number): number => {
    const scale = screenWidth / 320;
    return Math.round(size * scale);
};