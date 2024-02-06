export interface ImageMap {
    [key: string]: NodeRequire;
}

export const imageMap: { [key: string]: any } = {
    Volllinie: require('../../assets/Images/Volllinie.png'),
    Strichlinie: require('../../assets/Images/Strichlinie.png'),
    Strichpunktlinie: require('../../assets/Images/Strichpunktlinie.png'),
    Strichpunktpunktlinie: require('../../assets/Images/Strichpunktpunktlinie.png'),
    Formel: {
        source: require('../../assets/Images/Formel.png'),
        style: {width: '85%', height: 300}
    }
};
