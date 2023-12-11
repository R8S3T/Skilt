import React from "react";


export interface LearnArea {
    id: string;
    title: string;
}

export interface EducationYear {
    year: number;
    learnAreas: LearnArea[];
}

interface EducationDataComponentProps {
    children: (data: EducationYear[]) => JSX.Element;
}

const educationData: EducationYear[] = [
    {
        year: 1,
        learnAreas: [
            { id: '1', title: 'Lernfeld 1' },
            { id: '2', title: 'Lernfeld 2' },
            { id: '3', title: 'Lernfelder 3' },
            { id: '4', title: 'Lernfelder 4' }
        ]
    },
    {
        year: 2,
        learnAreas: [
            { id: '5', title: 'Lernfelder 5' },
            { id: '6', title: 'Lernfelder 6' },
            { id: '7', title: 'Lernfelder 7' },
            { id: '8', title: 'Lernfelder 8' }
        ]
    },
    {
        year: 3,
        learnAreas: [
            { id: '9', title: 'Lernfelder 9' },
            { id: '10', title: 'Lernfelder 10' },
            { id: '11', title: 'Lernfelder 11' },
            { id: '12', title: 'Lernfelder 12' }
        ]
    },
    {
        year: 4,
        learnAreas: [
            { id: '13', title: 'Lernfelder 13' },
            { id: '14', title: 'Lernfelder 14' },
            { id: '15', title: 'Lernfelder 15' },
        ]
    },
];

const EducationDataComponent: React.FC<EducationDataComponentProps> = ({ children }) => {
    return children(educationData);
};

export default EducationDataComponent;