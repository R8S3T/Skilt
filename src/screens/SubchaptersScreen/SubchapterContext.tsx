import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SubchapterContextType {
    unlockedSubchapters: number[];
    finishedSubchapters: number[];
    currentSubchapterId: number | null;
    currentSubchapterTitle: string;
    unlockSubchapter: (subchapterId: number) => void;
    markSubchapterAsFinished: (subchapterId: number) => void;
    setCurrentSubchapter: (subchapterId: number | null, subchapterTitle: string) => void;

}

const SubchapterContext = createContext<SubchapterContextType | undefined>(undefined);

interface SubchapterProviderProps {
    children: ReactNode;
}

export const useSubchapter = (): SubchapterContextType => {
    const context = useContext(SubchapterContext);
    if (!context) {
        throw new Error('useSubchapter must be used within a SubchapterProvider');
    }
    return context;
}

export const SubchapterProvider: React.FC<SubchapterProviderProps> = ({ children }) => {
    const [unlockedSubchapters, setUnlockedSubchapters] = useState<number[]>([1]);
    const [finishedSubchapters, setFinishedSubchapters] = useState<number[]>([]);
    const [currentSubchapterId, setCurrentSubchapterId] = useState<number | null>(null);
    const [currentSubchapterTitle, setCurrentSubchapterTitle] = useState<string>('');

    const unlockSubchapter = (subchapterId: number) => {
        setUnlockedSubchapters((current) => [...new Set([...current, subchapterId])]);
    };

    const markSubchapterAsFinished = (subchapterId: number) => {
        setFinishedSubchapters(current => [...new Set([...current, subchapterId])]);
    }

    const setCurrentSubchapter = (subchapterId: number | null, subchapterTitle: string) => {
        setCurrentSubchapterId(subchapterId);
        setCurrentSubchapterTitle(subchapterTitle);
    };

    return (
        <SubchapterContext.Provider value={{
            unlockedSubchapters,
            finishedSubchapters,
            currentSubchapterId,
            currentSubchapterTitle,
            unlockSubchapter,
            markSubchapterAsFinished,
            setCurrentSubchapter
        }}>
            {children}
        </SubchapterContext.Provider>
    );
}
