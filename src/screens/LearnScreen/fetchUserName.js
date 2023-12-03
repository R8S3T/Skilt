import React, { useState, useEffect } from 'react';
import { fetchData } from '../../utilities/fetchData';

const fetchUserName = () => {
    const [greetingName, setGreetingName] = useState('');

    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const result = await fetchData('SELECT Name FROM User ORDER BY ID DESC LIMIT 1', []);
                if (result.length > 0) {
                    setGreetingName(result[0].Name);
                }
            } catch (error) {
                console.error('Error fetching user name:', error);
            }
        };

        fetchUserName();
    }, []);

    return (
        <div>{greetingName ? `Hello, ${greetingName}` : 'Loading...'}</div>
    );
};

export default fetchUserName;
