import React from 'react';
import {Box, IconButton, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MiniPreview from "../components/MiniPreview";
import Divider from '@mui/material/Divider';
import SpeedIcon from '@mui/icons-material/Speed';
import ExploreIcon from '@mui/icons-material/Explore';
import WifiIcon from '@mui/icons-material/Wifi';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import PowerIcon from '@mui/icons-material/Power';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import AccessTimeIcon from '@mui/icons-material/AccessTime';



const drawerWidth = 300;

const AppLayout = ({children, open, setOpen, viewMode, setViewMode, data}) => {

    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <Box sx={{display: 'flex', height: '100vh', width: '100vw', position: 'relative'}}>
            {/* Sidebar */}
            {open && (
                <Box
                    sx={{
                        width: drawerWidth,
                        backgroundColor: '#212121',
                        color: '#f5f5f5',
                        boxSizing: 'border-box',
                        padding: 3,
                    }}
                >
                    {/* Toggle */}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <IconButton onClick={toggleDrawer} sx={{ color: '#f5f5f5' }}>
                            <MenuIcon />
                        </IconButton>
                    </Box>

                    {/* Titolo */}
                    <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ fontWeight: 'bold', marginTop: 2, marginBottom: 2 }}
                    >
                        Dati Yacht
                    </Typography>

                    <Divider sx={{ borderColor: '#444', marginBottom: 2 }} />

                    {/* Dati principali */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Typography variant="body2">
                            <SpeedIcon sx={{ fontSize: 18, verticalAlign: 'middle', mr: 1 }} />
                            <strong>Velocità:</strong> {data?.velocita ?? '--'} kn
                        </Typography>

                        <Typography variant="body2">
                            <ExploreIcon sx={{ fontSize: 18, verticalAlign: 'middle', mr: 1 }} />
                            <strong>Bussola:</strong> {data?.direzione_bussola ?? '--'}°
                        </Typography>

                        <Typography variant="body2">
                            <WifiIcon sx={{ fontSize: 18, verticalAlign: 'middle', mr: 1 }} />
                            <strong>Stato:</strong> {data?.stato ?? '--'}
                        </Typography>

                        <Typography variant="body2">
                            <BatteryChargingFullIcon sx={{ fontSize: 18, verticalAlign: 'middle', mr: 1 }} />
                            <strong>Tensione:</strong> {data?.tensione ?? '--'} V
                        </Typography>

                        <Typography variant="body2">
                            <PowerIcon sx={{ fontSize: 18, verticalAlign: 'middle', mr: 1 }} />
                            <strong>Accensione:</strong> {data?.accensione ? 'Attiva' : 'Spenta'}
                        </Typography>
                    </Box>

                    <Divider sx={{ borderColor: '#444', marginY: 2 }} />

                    {/* Posizione e tempo */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Typography variant="body2">
                            <MyLocationIcon sx={{ fontSize: 18, verticalAlign: 'middle', mr: 1 }} />
                            <strong>Posizione:</strong><br />
                            {data?.posizione?.lat?.toFixed(5) ?? '--'}, {data?.posizione?.lon?.toFixed(5) ?? '--'}
                        </Typography>

                        <Typography variant="body2">
                            <AccessTimeIcon sx={{ fontSize: 18, verticalAlign: 'middle', mr: 1 }} />
                            <strong>Ultimo update:</strong>{' '}
                            {data?.ultimo_aggiornamento
                                ? new Date(data.ultimo_aggiornamento).toLocaleTimeString()
                                : '--'}
                        </Typography>
                    </Box>
                </Box>
            )}

            {/* Area principale */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    height: '100vh',
                    width: open ? `calc(100vw - ${drawerWidth}px)` : '100vw',
                    transition: 'width 0.3s ease',
                    overflow: 'hidden',
                }}
            >
                <MiniPreview viewMode={viewMode} setViewMode={setViewMode} open={open} />
                {children}
            </Box>

            {/* Pulsante flottante per riaprire sidebar */}
            {!open && (
                <IconButton
                    onClick={toggleDrawer}
                    sx={{
                        position: 'absolute',
                        top: 10,
                        left: 10,
                        zIndex: 1300,
                        backgroundColor: 'white',
                        boxShadow: 2,
                    }}
                >
                    <MenuIcon/>
                </IconButton>
            )}

        </Box>
    );

};

export default AppLayout;
