import React, { useState } from 'react';
import AppLayout from './layouts/AppLayout';
import MapView from './features/map/MapView';
import Yacht3DView from './features/yacht3D/Yacht3DView';

function App() {
    const [openSidebar, setOpenSidebar] = useState(true);
    const [viewMode, setViewMode] = useState('map');

    const renderView = () => {
        if (viewMode === 'map') return <MapView sidebarOpen={openSidebar} />;
        if (viewMode === '3d') return <Yacht3DView />;
        return null;
    };

    return (
        <AppLayout
            open={openSidebar}
            setOpen={setOpenSidebar}
            viewMode={viewMode}
            setViewMode={setViewMode}
        >
            {renderView()}
        </AppLayout>
    );
}

export default App;
