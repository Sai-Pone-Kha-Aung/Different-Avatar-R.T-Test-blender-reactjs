import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Sky } from "@react-three/drei";
import CHIEF from "./Chief"
import Xbot from "./Xbot"
import Ninja from "./NINJA"
import Ybot from "./Ybot"
import "./styles.css";

function App() {
    const [action, setAction] = useState("dance")
    return (
        <>
            <Canvas camera={{ position: [0, 2, 7] }}>

                <ambientLight />
                <Sky
                    distance={450000}
                    sunPosition={[5, 1, 8]}
                    inclination={0}
                    azimuth={0.25} />

                <mesh position={0, 0, 0} rotation={[-Math.PI / 2, 0, 0]}>
                    <planeBufferGeometry attach="geometry" args={[100, 100]} />
                    <meshLambertMaterial attach="material" color="white" />
                </mesh>

                <Suspense fallback={null}>
                    <Xbot action={action} />
                    <CHIEF action={action} />
                    <Ninja action={action} />
                    <Ybot action={action} />
                </Suspense>
                <OrbitControls target={[0, 1, 0]} />

            </Canvas>
            <div className="controls">
                <button onClick={() => setAction("dance")}>LiaKim_13s</button>
                <button onClick={() => setAction("dance1")}>MichaelLe_13s</button>
            </div>
        </>

    )

}
export default App;



