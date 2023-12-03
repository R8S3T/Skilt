// LottieAnimation.js
import React, { useRef, useEffect } from 'react';
import LottieView from 'lottie-react-native';

const LottieAnimation = ({ source, style }) => {
    const animationRef = useRef(null);
    useEffect(() => {
        animationRef.current?.reset();
        setTimeout(() => {
            animationRef.current?.play();
        }, 100)

    }, []);

    return <LottieView ref={animationRef} source={source} loop style={style} />;
};

export default LottieAnimation;
