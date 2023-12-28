import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LearnAreasV2 from '../screens/LearnAreasV2/LearnAreasV2';
import LearnScreen from '../screens/LearnScreen/LearnScreen';
import Chapters from '../screens/Chapters';
import Subchapters from '../screens/Subchapters';
import IntroSlider from './IntroSlider';
import YearsScreen from '../screens/YearsScreen/YearsScreen';

export type LearnStackParamList = {
    LearnMain: undefined;
    LearnAreas: undefined;
    LearnAreasHex: undefined;
    Chapters: undefined;
    Subchapters: { subchapterId: string };
    IntroSlider: undefined;
    YearsScreen: undefined;
};

const LearnStack = createNativeStackNavigator<LearnStackParamList>();

const LearnStackNavigator: React.FC = () => {
    return (
        <LearnStack.Navigator initialRouteName='LearnMain'>
            <LearnStack.Screen
                name='LearnMain'
                component={LearnScreen}
                options={{ headerShown: false }}
            />
            <LearnStack.Screen
                name='LearnAreas'
                component={LearnAreasV2}
                options={{ headerShown: false }}
            />
            <LearnStack.Screen
                name='Chapters'
                component={Chapters}
                options={{ headerShown: false }}
            />
            <LearnStack.Screen
                name='Subchapters'
                component={Subchapters}
                options={{ headerShown: false }}
            />
            <LearnStack.Screen
                name="IntroSlider"
                component={IntroSlider}
                options={{ headerShown: false }}
            />
            <LearnStack.Screen
                name="YearsScreen"
                component={YearsScreen}
                options={{ headerShown: false }}
            />
        </LearnStack.Navigator>
    )
}

export default LearnStackNavigator;