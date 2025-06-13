import React from 'react';
import {Box, Drawer, IconButton, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {Button} from '@mui/material';
import MiniPreview from "../components/MiniPreview";


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
                        backgroundColor: '##e0e0e0',
                        color: '#eeeeee', // 👈 aggiunto
                        boxSizing: 'border-box',
                        padding: 2,
                    }}
                >
                    <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                        <IconButton onClick={toggleDrawer}>
                            <MenuIcon/>
                        </IconButton>
                    </Box>

                    <Typography variant="h6" gutterBottom>
                        Dati Yacht
                    </Typography>
                    <Typography variant="body2">Velocità: {data?.velocita ?? '--'} nodi</Typography>
                    <Typography variant="body2">Direzione bussola: {data?.direzione_bussola ?? '--'}°</Typography>
                    <Typography variant="body2">Stato: {data?.stato ?? '--'}</Typography>
                    <Typography variant="body2">Voltaggio: {data?.tensione ?? '--'} V</Typography>
                    <Typography variant="body2">Accensione: {data?.accensione ? 'Attiva' : 'Spenta'}</Typography>
                    <Typography variant="body2">
                        Posizione: {data?.posizione?.lat?.toFixed(5) ?? '--'}, {data?.posizione?.lon?.toFixed(5) ?? '--'}
                    </Typography>
                    <Typography variant="body2">
                        Ultimo aggiornamento: {data?.ultimo_aggiornamento ? new Date(data.ultimo_aggiornamento).toLocaleTimeString() : '--'}
                    </Typography>

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
