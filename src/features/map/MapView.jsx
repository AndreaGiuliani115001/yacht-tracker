import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Box } from '@mui/material';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import MapAutoResize from './MapAutoResize';
import { ZoomControl } from 'react-leaflet';


// Fix icone Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).href,
    iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href,
    shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).href,
});

const MapView = ({ sidebarOpen }) => {
    const position = [42.0, 12.0]; // Mock position

    return (
        <Box sx={{ height: '100%', width: '100%' }}>
            <MapContainer
                key={sidebarOpen ? 'open' : 'closed'}
                center={position}
                zoom={6}
                zoomControl={false}
                style={{ height: '100%', width: '100%' }}
            >
                <ZoomControl position="bottomright" />


                <MapAutoResize dependency={sidebarOpen} />
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; OpenStreetMap'
                />
                <Marker position={position}>
                    <Popup>Yacht mock - posizione iniziale</Popup>
                </Marker>
            </MapContainer>
        </Box>
    );
};

export default MapView;
