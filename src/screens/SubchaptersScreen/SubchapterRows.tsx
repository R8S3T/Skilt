import React from "react";
import { View, StyleSheet } from 'react-native';
import SubchapterNode from "./SubchapterNode";
import { Subchapter, SubchapterRow } from './SubchaptersScreen';


interface SubchapterRowsProps {
    subchapters: Subchapter[];
}

const SubchapterRows: React.FC<SubchapterRowsProps> = ({ subchapters }) => {
    const rows: SubchapterRow[] = subchapters.reduce<SubchapterRow[]>((acc, subchapter, idx) => {
        if (idx % 2 === 0) {
            acc.push({ id: `row-${Math.floor(idx / 2)}`, subchapters: [] });
        }
        acc[acc.length - 1].subchapters.push(subchapter);
        return acc;
    }, []);

    const totalNodes = subchapters.length;
    const numRows = Math.ceil(totalNodes / 2);
    const isOddNumberOfNodes = totalNodes % 2 !== 0;

    return (
        <View>
            {rows.map((row, rowIndex) => {
                const isLastRow = rowIndex === numRows - 1;
                const isSpecialLastRow = isLastRow && isOddNumberOfNodes;
                const shouldPlaceInvisibleNodeFirst = isSpecialLastRow && (numRows % 2 === 0);

                return (
                    <View key={row.id} style={styles.row}>
                        {shouldPlaceInvisibleNodeFirst && <View style={styles.invisibleNode} />}
                        {row.subchapters.map((subchapter) => (
                            <SubchapterNode
                                key={subchapter.id}
                                isLocked={subchapter.isLocked}
                                onPress={() => console.log('Subchapter pressed')}
                            />
                        ))}
                        {isSpecialLastRow && !shouldPlaceInvisibleNodeFirst && <View style={styles.invisibleNode} />}
                    </View>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
    },
    invisibleNode: {
        width: 100,
        height: 100,
        opacity: 0,
    },
});

export default SubchapterRows;