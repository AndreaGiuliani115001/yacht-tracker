import { useState, useEffect } from 'react';
import { fetchYachtData } from '../api/yachtAPI';

export function useYachtData(pollingInterval = 5000) {
    const [data, setData] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchAndUpdate = async () => {
            const newData = await fetchYachtData();
            if (isMounted && newData) {
                setData(newData);
                setLastUpdated(new Date());
            }
        };

        fetchAndUpdate();
        const interval = setInterval(fetchAndUpdate, pollingInterval);

        return () => {
            isMounted = false;
            clearInterval(interval);
        };
    }, [pollingInterval]);

    return { data, lastUpdated };
}
