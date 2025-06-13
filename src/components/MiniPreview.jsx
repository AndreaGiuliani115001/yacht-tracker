import { Box, Typography } from "@mui/material";
import { MapContainer, TileLayer } from "react-leaflet";

const MiniPreview = ({ viewMode, setViewMode, open }) => {
    const handleClick = () => {
        setViewMode(viewMode === "map" ? "3d" : "map");
    };

    return (
        <Box
            onClick={handleClick}
            sx={{
                position: "absolute",
                bottom: 16,
                left: open ? 316 : 16,
                width: 200,
                height: 150,
                border: "2px solid white",
                borderRadius: 2,
                overflow: "hidden",
                cursor: "pointer",
                zIndex: 1200,
                backgroundColor: "white",
                boxShadow: 3,
                transition: "left 0.3s ease",
            }}
        >
            {viewMode === "map" ? (
                <Box
                    sx={{
                        width: "100%",
                        height: "100%",
                        backgroundImage: 'url("/boat.png")',
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                />
            ) : (
                <MapContainer
                    center={[41.9028, 12.4964]}
                    zoom={3}
                    zoomControl={false}
                    dragging={false}
                    doubleClickZoom={false}
                    scrollWheelZoom={false}
                    style={{ width: "100%", height: "100%" }}
                >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                </MapContainer>
            )}
            <Typography
                variant="caption"
                sx={{
                    position: "absolute",
                    bottom: 4,
                    left: 8,
                    color: "#333",
                    backgroundColor: "rgba(255,255,255,0.8)",
                    padding: "2px 6px",
                    borderRadius: "4px",
                }}
            >
                Clic per vista {viewMode === "map" ? "3D" : "Mappa"}
            </Typography>
        </Box>
    );
};

export default MiniPreview;
