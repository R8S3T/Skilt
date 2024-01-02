import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface SubchapterNodeProps {
    isLocked: boolean;
    onPress: () => void;
}

const SubchapterNode: React.FC<SubchapterNodeProps> = ({ isLocked, onPress }) => {
    const iconSource = isLocked
        ? require('../../../assets/Images/lock_icon.png')
        : require('../../../assets/Images/play_icon.png');

    const iconStyle = isLocked ? [styles.icon, styles.inactiveIcon] : [styles.icon, styles.activeIcon];
    const containerStyle = isLocked ? styles.inactiveContainer : styles.activeContainer;

    return (
        <View style={containerStyle}>
            <TouchableOpacity onPress={onPress} disabled={isLocked} style={styles.button}>
                {isLocked ? (
                    <LinearGradient
                        colors={['#dcd9d9', '#bfbfbf']}
                        style={styles.gradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <Image source={iconSource} style={iconStyle} resizeMode="contain" />
                    </LinearGradient>
                ) : (
                    <Image source={iconSource} style={iconStyle} />
                )}
            </TouchableOpacity>
        </View>
    );
};

const nodeSize = 100;

const styles = StyleSheet.create({
    activeContainer: {
        width: nodeSize,
        height: nodeSize,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        borderRadius: 25,
        borderWidth: 2.5,
        borderColor: '#FFA500',
        backgroundColor: '#FFFFFF',
    },
    inactiveContainer: {
        width: nodeSize,
        height: nodeSize,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        borderRadius: 25,
        borderWidth: 2.5,
        borderColor: '#A9A9A9',
        backgroundColor: 'transparent',
    },
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
    icon: {
        width: 50,
        height: 50,
    },
    activeIcon: {
        tintColor: '#FFA500', // Orange color for the active icon
    },
    inactiveIcon: {
        tintColor: '#FFFFFF', // White color for inactive icons
    },
});

export default SubchapterNode;