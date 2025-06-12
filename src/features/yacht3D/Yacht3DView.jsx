import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const Yacht3DModel = () => {
    return (
        <group>
            {/* Ponte (box) */}
            <mesh position={[0, 0.5, 0]}>
                <boxGeometry args={[4, 1, 2]} />
                <meshStandardMaterial color="#4a90e2" />
            </mesh>

            {/* Motore (cilindro) */}
            <mesh position={[0, -0.5, 1]}>
                <cylinderGeometry args={[0.3, 0.3, 1, 32]} rotation={[Math.PI / 2, 0, 0]} />
                <meshStandardMaterial color="#ff6f61" />
            </mesh>
        </group>
    );
};

const Yacht3DView = () => {
    return (
        <div style={{ height: '100%', width: '100%' }}>
            <Canvas camera={{ position: [6, 3, 6], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={0.7} />
                <Yacht3DModel />
                <OrbitControls enablePan={false} target={[0, 0.5, 0]} />
            </Canvas>
        </div>
    );
};

export default Yacht3DView;
