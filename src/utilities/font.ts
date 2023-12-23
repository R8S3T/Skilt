import * as Font from 'expo-font';

export async function loadFonts() {
    await Font.loadAsync({
        'Montserrat-Bold': require('../../assets/Fonts/montserrat/Montserrat-Bold.otf'),
        'Montserrat-Medium': require('../../assets/Fonts/montserrat/Montserrat-Medium.otf'),
        'Montserrat-Alternates-Light': require('../../assets/Fonts/montserrat/MontserratAlternates-Light.otf'),
        'Montserrat-Alternates-Medium': require('../../assets/Fonts/montserrat/MontserratAlternates-Medium.otf')
    });
}