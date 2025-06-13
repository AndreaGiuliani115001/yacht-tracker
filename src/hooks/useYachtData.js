import { useState, useEffect } from 'react';
import { fetchYachtData } from '../api/yachtAPI';

export function useYachtData(pollingInterval = 5000) {
    const [data, setData] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(null);
    const [forzaGHistory, setForzaGHistory] = useState([]);

    useEffect(() => {
        let isMounted = true;

        const fetchAndUpdate = async () => {
            const newData = await fetchYachtData();
            if (isMounted && newData) {
                setData(newData);
                setLastUpdated(new Date());
                // Aggiorna storico forza G (max 20 elementi)
                setForzaGHistory(prev => [
                    ...prev.slice(-19),
                    {
                        time: new Date(newData.ultimo_aggiornamento).toLocaleTimeString(),
                        g: Number(newData.forza_g ?? 0)
                    }
                ]);
            }
        };

        fetchAndUpdate();
        const interval = setInterval(fetchAndUpdate, pollingInterval);

        return () => {
            isMounted = false;
            clearInterval(interval);
        };
    }, [pollingInterval]);

    return { data, lastUpdated, forzaGHistory };
}
