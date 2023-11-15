import LottieView from 'lottie-react-native';

const slides = [
    {
        key: 'one',
        animation: require('../../assets/Animations/welcome_animation.json'),
        title: 'Willkommen bei Skilt',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet nisl suscipit adipiscing bibendum est. Nulla porttitor massa id neque aliquam vestibulum morbi blandit cursus.',
        backgroundColor: '#f6f5f5',
    },
    {
        key: 'two',
        animation: require('../../assets/Animations/knowledge_animation.json'),
        title: 'Lernen mit kleinen Wissens-Häppchen',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet nisl suscipit adipiscing bibendum est. Nulla porttitor massa id neque aliquam vestibulum morbi blandit cursus.',
        backgroundColor: '#f6f5f5',
    },
    {
        key: 'three',
        animation: require('../../assets/Animations/quiz_animation.json'),
        title: 'Interaktive Quizzes',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet nisl suscipit adipiscing bibendum est. Nulla porttitor massa id neque aliquam vestibulum morbi blandit cursus.',
        backgroundColor: '#f6f5f5',
    },
];

export default slides;