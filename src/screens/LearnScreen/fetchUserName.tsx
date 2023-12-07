import React, { useState, useEffect } from 'react';
import { fetchData } from '../../utilities/fetchData';


interface User {
    Name: string;
}

const useFetchUserName = (): string => {
    const [greetingName, setGreetingName] = useState<string>('');

    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const result = await fetchData<User>('SELECT Name FROM User ORDER BY ID DESC LIMIT 1', []);
                if (result.length > 0) {
                    setGreetingName(result[0].Name);
                }
            } catch (error) {
                console.error('Error fetching user name:', error);
            }
        };

        fetchUserName();
    }, []);

    return greetingName;
};

export default useFetchUserName;
