import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Box } from '@mui/material';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import MapAutoResize from './MapAutoResize';
import { ZoomControl } from 'react-leaflet';
import { Polyline } from 'react-leaflet';

const yachtIcon = new L.Icon({
    iconUrl: '/iconYacht.svg', // relativo a /public
    iconSize: [40, 40],          // o 32x32, dipende dalla tua immagine
    iconAnchor: [20, 20],        // punto al centro dell'icona
    popupAnchor: [0, -20],       // popup sopra l’icona
});


const MapView = ({ sidebarOpen, data, route }) => {
    const position = data?.posizione
        ? [data.posizione.lat, data.posizione.lon]
        : [42.0, 12.0]; // fallback iniziale


    return (
        <Box sx={{ height: '100%', width: '100%' }}>
            <MapContainer
                center={position}
                key="yacht-map"
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
                <Marker position={position} icon={yachtIcon}>
                    <Popup>
                        Yacht<br />
                        Lat: {position[0].toFixed(5)}<br />
                        Lon: {position[1].toFixed(5)}
                    </Popup>
                </Marker>
                {route.length > 1 && (
                    <Polyline
                        positions={route}
                        pathOptions={{ color: 'blue', weight: 3 }}
                    />
                )}
            </MapContainer>
        </Box>
    );
};

export default MapView;
