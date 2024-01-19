import React, { Component } from 'react';
import { StyleSheet, Animated, PanResponder, PanResponderGestureState } from 'react-native';

interface IDraggableState {
    showDraggable: boolean;
    pan: Animated.ValueXY;
    opacity: Animated.Value;
}

interface IDraggableProps {}

export default class Draggable extends Component<IDraggableProps, IDraggableState> {
    _val: { x: number; y: number };
    panResponder: ReturnType<typeof PanResponder.create>;

    constructor(props: IDraggableProps) {
        super(props);
        this.state = {
        showDraggable: true,
        pan: new Animated.ValueXY(),
        opacity: new Animated.Value(1)
        };
    this._val = { x: 0, y: 0 };
    this.state.pan.addListener((value) => this._val = value);

    this.panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event(
            [null, { dx: this.state.pan.x, dy: this.state.pan.y }],
            { useNativeDriver: false }
        ),
        onPanResponderRelease: (e, gesture) => {
            if (this.isDropArea(gesture)) {
            Animated.timing(this.state.opacity, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: false
            }).start(() =>
                this.setState({
                showDraggable: false
                })
            );
            } else {
            Animated.spring(this.state.pan, {
                toValue: { x: 0, y: 0 },
                friction: 5,
                useNativeDriver: false
            }).start();
            }
        }
        });
    }

    isDropArea(gesture: PanResponderGestureState) {
        return gesture.moveY < 350;
    }

    render() {
    const panStyle = {
        transform: this.state.pan.getTranslateTransform(),
        opacity: this.state.opacity
    };

    return (
        this.state.showDraggable &&
        <Animated.View
            {...this.panResponder.panHandlers}
            style={[panStyle, styles.circle]}
        />
        );
    }
}

const CIRCLE_RADIUS = 30;
const styles = StyleSheet.create({
    circle: {
        backgroundColor: "skyblue",
        width: CIRCLE_RADIUS * 2,
        height: CIRCLE_RADIUS * 2,
        borderRadius: CIRCLE_RADIUS,
    },
});

