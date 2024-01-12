import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SubchapterContextType {
    unlockedSubchapters: number[];
    unlockSubchapter: (subchapterId: number) => void;
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

    const unlockSubchapter = (subchapterId: number) => {
        setUnlockedSubchapters((current) => [...new Set([...current, subchapterId])]);
    };

    return (
        <SubchapterContext.Provider value={{ unlockedSubchapters, unlockSubchapter }}>
            {children}
        </SubchapterContext.Provider>
    )
}