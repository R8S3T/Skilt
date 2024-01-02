import React from "react";
import { View, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import SubchapterRows from "./SubchapterRows";
import { subchapters } from "./subchaptersTitle";

export interface Subchapter {
    id: number;
    title: string;
    isLocked: boolean;
}

export interface SubchapterRow {
    id: string;
    subchapters: Subchapter[];
}

const SubchaptersScreen: React.FC = () => {
    return (
        <ScrollView style={styles.container}>
            <SubchapterRows subchapters={subchapters} />
        </ScrollView>
    );
};

const nodeSize = 100;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gridContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        position: 'relative',
    },
    lastRow: {
        justifyContent: 'flex-start',
    },
    lastNodeRight: {
        position: 'absolute',
        right: 0,
    },
    lastNodeLeft: {
        position: 'absolute',
        left: 0,
    },
    emptyNode: {
        width: nodeSize,
        height: nodeSize,
    },
    invisibleNode: {
        width: nodeSize,
        height: nodeSize,
        opacity: 0,
    },
});

export default SubchaptersScreen;
