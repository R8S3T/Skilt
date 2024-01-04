import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getDynamicIconSize } from '../../utilities/utils';

interface SubchapterNodeProps {
    isLocked: boolean;
    onPress: () => void;
}

const SubchapterNode: React.FC<SubchapterNodeProps> = ({
    isLocked,
    onPress,
}) => {
    const dynamicNodeSize = getDynamicIconSize(80, 100);
    const dynamicIconSize = getDynamicIconSize(40, 50);

    const iconSource = isLocked
        ? require('../../../assets/Images/lock_icon.png')
        : require('../../../assets/Images/play_icon.png');

        // Create dynamic styles within function
    const dynamicStyles = StyleSheet.create({
        container: {
            width: dynamicNodeSize,
            height: dynamicNodeSize,
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 10,
            borderRadius: 25,
            borderWidth: 2.5,
            borderColor: isLocked ? '#A9A9A9' : '#FFA500',
            backgroundColor: isLocked ? 'transparent' : '#FFFFFF',
            marginHorizontal: 25,
        },
        icon: {
            width: dynamicIconSize,
            height: dynamicIconSize,
            tintColor: isLocked ? '#FFFFFF' : '#FFA500',
        },
    });

    return (
        <View style={dynamicStyles.container}>
            <TouchableOpacity onPress={onPress} disabled={isLocked} style={styles.button}>
                {isLocked ? (
                    <LinearGradient
                        colors={['#dcd9d9', '#bfbfbf']}
                        style={styles.gradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <Image source={iconSource} style={dynamicStyles.icon} resizeMode="contain" />
                    </LinearGradient>
                ) : (
                    <Image source={iconSource} style={dynamicStyles.icon} />
                )}
            </TouchableOpacity>
        </View>
    );
};

const nodeSize = 100;

const styles = StyleSheet.create({

    button: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
    },
    gradient: {
        width: '100%',
        height: '100%',
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default SubchapterNode;