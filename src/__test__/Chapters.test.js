import React from 'react';
import { render, act, cleanup } from '@testing-library/react-native';
import Chapters from '../screens/Chapters';

// Mock openDatabase and transaction methods
jest.mock("../utilities/database", () => ({
    getDatabase: jest.fn().mockImplementation(() => ({
        transaction: (callback) => {
        const mockTx = {
            executeSql: (query, params, successCallback, errorCallback) => {
            if (query.includes("Chapters WHERE ChapterId")) {
                successCallback(null, {
                rows: {
                    _array: [{
                    ChapterName: "Mocked Chapter",
                    ChapterIntro: "This is a mocked chapter intro.",
                    }],
                },
                });
            } else if (query.includes("Subchapters WHERE ChapterId")) {
                successCallback(null, {
                rows: {
                    _array: [
                    {
                        SubchapterName: "Mocked Subchapter 1",
                        SubchapterId: "1",
                    },
                    {
                        SubchapterName: "Mocked Subchapter 2",
                        SubchapterId: "2",
                    },
                    ],
                },
                });
            } else {
                errorCallback(null, new Error("Query not recognized."));
            }
            },
        };
        callback(mockTx);
        },
    })),
}));

describe('<Chapters />', () => {
it('fetches and sets the chapter and subchapters data correctly', async () => {
    const mockRoute = { params: { chapterId: '1' } };
    const mockNavigation = { navigate: jest.fn() };

    // Render outside of act
    const { getByText, unmount } = render(<Chapters navigation={mockNavigation} route={mockRoute} />);

    // Assuming fetchData in Chapters is asynchronous, wrap it with act
    await act(async () => {});

    // Check if mocked data is displayed correctly
    expect(getByText("Mocked Chapter")).toBeTruthy();
    expect(getByText("This is a mocked chapter intro.")).toBeTruthy();
    expect(getByText("Mocked Subchapter 1")).toBeTruthy();
    expect(getByText("Mocked Subchapter 2")).toBeTruthy();
});

    // Cleanup after test
    afterEach(() => {
        cleanup();
    });
});
