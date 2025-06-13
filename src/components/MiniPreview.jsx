import { Box, Typography } from "@mui/material";
import { MapContainer, TileLayer } from "react-leaflet";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const MiniPreview = ({ viewMode, setViewMode }) => {
    const handleClick = () => {
        setViewMode(viewMode === "map" ? "3d" : "map");
    };

    return (
        <MotionBox
            drag
            dragMomentum={false}
            onTap={handleClick}
            initial={{ x: 16, y: 16 }}
            style={{
                position: "absolute",
                width: 200,
                height: 150,
                border: "2px solid white",
                borderRadius: 8,
                overflow: "hidden",
                cursor: "grab",
                zIndex: 1200,
                backgroundColor: "white",
                boxShadow: "0px 4px 12px rgba(0,0,0,0.2)"
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
        </MotionBox>
    );
};

export default MiniPreview;
