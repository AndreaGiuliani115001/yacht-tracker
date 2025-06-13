import React, { useState } from 'react';
import AppLayout from './layouts/AppLayout';
import MapView from './features/map/MapView';
import Yacht3DView from './features/yacht3D/Yacht3DView';
import { useYachtData } from './hooks/useYachtData';
import { useEffect } from 'react';


function App() {
    const [openSidebar, setOpenSidebar] = useState(true);
    const [viewMode, setViewMode] = useState('map');
    const [route, setRoute] = useState([]);
    const { data, forzaGHistory  } = useYachtData();

    useEffect(() => {
        if (data?.posizione?.lat && data?.posizione?.lon) {
            const newPosition = [data.posizione.lat, data.posizione.lon];

            // Evita duplicati consecutivi
            setRoute((prevRoute) => {
                const last = prevRoute[prevRoute.length - 1];
                const isSame =
                    last && last[0] === newPosition[0] && last[1] === newPosition[1];

                return isSame ? prevRoute : [...prevRoute, newPosition];
            });
        }
    }, [data]);

    const renderView = () => {
        if (viewMode === 'map') return <MapView sidebarOpen={openSidebar} data={data}  route={route}/>;
        if (viewMode === '3d') return <Yacht3DView data={data} forzaGHistory={forzaGHistory}/>;
        return null;
    };


    return (
        <AppLayout
            open={openSidebar}
            setOpen={setOpenSidebar}
            viewMode={viewMode}
            setViewMode={setViewMode}
            data={data}
            forzaGHistory={forzaGHistory}
        >
            {renderView()}

        </AppLayout>
    );
}

export default App;
