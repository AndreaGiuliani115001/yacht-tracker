import { useMap } from 'react-leaflet';
import { useEffect } from 'react';

const MapAutoResize = ({ dependency }) => {
    const map = useMap();

    useEffect(() => {
        setTimeout(() => {
            map.invalidateSize();
        }, 200);
    }, [dependency]);

    return null;
};

export default MapAutoResize;
