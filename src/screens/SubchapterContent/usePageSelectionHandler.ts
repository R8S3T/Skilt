import { useState, useEffect } from "react";

interface PageSelectedEvent {
    nativeEvent: {
        position: number;
    }
}

interface CombinedDataItem {
    type: 'content' | 'quiz';
    data: any;
}

export const usePageSelectionHandler = (combinedData: CombinedDataItem[]) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentSlideType, setCurrentSlideType] = useState<'content' | 'quiz' | null>(null);

    useEffect(() => {
        if (combinedData.length > 0) {
            setCurrentSlideType(combinedData[0].type);
        }
    }, [combinedData]);

    const handlePageSelected = (e: PageSelectedEvent) => {   
        console.log('Page selected:', e.nativeEvent.position);     const index = e.nativeEvent.position;
        if (combinedData.length > index && combinedData[index]) {
            setCurrentIndex(index);
            setCurrentSlideType(combinedData[index].type);
        } else {
            console.error('Data at this index is not available:', index);
        }
    };

    return { currentIndex, handlePageSelected, currentSlideType };
};