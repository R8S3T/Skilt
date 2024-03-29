import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LearnScreen from '../screens/LearnScreen/LearnScreen';
import SubchapterContent from '../screens/SubchapterContent/SubchapterContent';
import IntroSlider from '../screens/IntroSlider/IntroSlider';
import YearsScreen from '../screens/YearsScreen/YearsScreen';
import ChaptersScreen from '../screens/ChaptersScreen/ChaptersScreen';
import SubchaptersScreen from '../screens/SubchaptersScreen/SubchaptersScreen';
import TestDragDrop from '../screens/TestScreen/TestDragDrop';
import CongratsScreen from '../screens/SubchapterContent/CongratsScreen';

export type LearnStackParamList = {
    LearnMain: undefined;
    LearnAreas: undefined;
    ChaptersScreen: { year: number };
    IntroSlider: undefined;
    YearsScreen: undefined;
    SubchaptersScreen: {
        chapterId: number;
        chapterTitle: string;
    };
    SubchapterContent: {
        chapterId: number;
        chapterTitle: string;
        hideTabs?: boolean;
    };
    TestDragDrop: undefined;
    CongratsScreen: undefined;
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
                name='YearsScreen'
                component={YearsScreen}
                options={{ headerShown: false }}
            />
            <LearnStack.Screen
                name='SubchapterContent'
                component={SubchapterContent}
                options={{ headerShown: false }}
            />
            <LearnStack.Screen
                name="IntroSlider"
                component={IntroSlider}
                options={{ headerShown: false }}
            />
            <LearnStack.Screen
                name="ChaptersScreen"
                component={ChaptersScreen}
                options={{ headerShown: false }}
            />
            <LearnStack.Screen
                name='SubchaptersScreen'
                component={SubchaptersScreen}
                options={{ headerShown: false }}
            />
            <LearnStack.Screen
                name='CongratsScreen'
                component={CongratsScreen}
                options={{ headerShown: false }}
            />
            <LearnStack.Screen
                name='TestDragDrop' // The name used in navigation
                component={TestDragDrop}
                options={{ headerShown: false }}
            />
        </LearnStack.Navigator>
    )
}

export default LearnStackNavigator;