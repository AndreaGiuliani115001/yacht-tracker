import React, {useRef, useEffect, Suspense} from 'react';
import {Canvas, useThree} from '@react-three/fiber';
import {OrbitControls, useGLTF} from '@react-three/drei';
import {Box3, Vector3} from 'three';
import ForceChart from './ForceChart';


function Yacht3DModel({onCenterCalculated}) {
    const group = useRef();
    const gltf = useGLTF("/models/yachtClaudioNoTexture.glb");

    const {scene} = gltf;

    useEffect(() => {
        if (group.current) {
            const box = new Box3().setFromObject(group.current);
            const center = new Vector3();
            box.getCenter(center);
            const size = new Vector3();
            box.getSize(size);

            // Centra l'oggetto
            group.current.position.sub(center);

            // Comunica al parent dove si trova il centro del modello
            onCenterCalculated(center);
        }
    }, [scene, onCenterCalculated]);

    return <primitive ref={group} object={scene}/>;
}

function YachtScene() {
    const controlsRef = useRef();
    const {camera} = useThree();

    const handleCenterCalculated = (center) => {
        if (controlsRef.current) {
            controlsRef.current.target.copy(center);
            controlsRef.current.update();
        }

        camera.lookAt(center);
    };

    return (
        <>
            <ambientLight intensity={0.5}/>
            <directionalLight position={[5, 5, 5]} intensity={0.7}/>
            <Suspense fallback={null}>
                <Yacht3DModel onCenterCalculated={handleCenterCalculated}/>
            </Suspense>
            <OrbitControls ref={controlsRef} enablePan={false}/>
        </>
    );
}

const Yacht3DView = ({ forzaGHistory }) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: 'calc(100vh)', // 👈 Assicurati di lasciare spazio per la navbar se c'è
            overflow: 'hidden',
            backgroundColor: '#111'
        }}>
            {/* 3D Canvas */}
            <div style={{ flexGrow: 1, minHeight: 300 }}>
                <Canvas camera={{ position: [6, 3, 6], fov: 50 }}>
                    <YachtScene />
                </Canvas>
            </div>

            {/* Grafico Forza G */}
            <div style={{ height: 220, paddingBottom: '2', boxSizing: 'border-box' }}>
                <ForceChart data={forzaGHistory} />
            </div>
        </div>
    );
};



export default Yacht3DView;
