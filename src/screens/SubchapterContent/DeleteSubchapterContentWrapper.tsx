import React, { useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import { NextButtonVisibilityContext } from './NextButtonVisibility';
import SubchapterContent from './SubchapterContent';
import { LearnStackParamList } from '../../components/LearnStackNavigator';


type SubchapterContentWrapperProps = {
    route: RouteProp<LearnStackParamList, 'SubchapterContent'>,
};

const SubchapterContentWrapper: React.FC<SubchapterContentWrapperProps> = ({ route }) => {
    const [showNextButton, setShowNextButton] = useState(false);
    const [onNextPress, setOnNextPress] = useState<() => void>(() => {});

    return (
        <NextButtonVisibilityContext.Provider value={{ showNextButton, setShowNextButton, onNextPress, setOnNextPress }}>
            <SubchapterContent route={route} />
        </NextButtonVisibilityContext.Provider>
    );
};


export default SubchapterContentWrapper;