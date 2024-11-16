import { redirect, type MetaFunction } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";

export const meta: MetaFunction = () => {
    return [
        { title: "Theia" },
        { name: "description", content: "Theia App" },
    ];
};

export default function Index() {
    // const [fallDetected, setFallDetected] = useState(false);
    // const [acceleration, setAcceleration] = useState({ x: 0, y: 0, z: 0 });
    


    // return (
    //     <>
    //     </>
    // );
    const [fallDetected, setFallDetected] = useState(false);
    const [acceleration, setAcceleration] = useState({ x: 0, y: 0, z: 0 });

    const navigate = useNavigate();

    useEffect(() => {
        const handleMotion = (event) => {
            const acc = event.accelerationIncludingGravity;

            // Calculate the magnitude of the acceleration vector
            const magnitude = Math.sqrt(
                (acc.x || 0) ** 2 + 
                (acc.y || 0) ** 2 + 
                (acc.z || 0) ** 2
            );

            setAcceleration({ x: acc.x, y: acc.y, z: acc.z });

            // Detect a fall based on a threshold
            const fallThreshold = 25; // Adjust this value experimentally
            if (magnitude > fallThreshold) {
                setFallDetected(true);

                navigate("fall-detected");

                // Reset detection after 2 seconds
                // setTimeout(() => setFallDetected(false), 2000);
            }
        };

        // Request permission for motion sensors on modern browsers
        const requestPermission = async () => {
            if (
                typeof DeviceMotionEvent.requestPermission === "function"
            ) {
                const response = await DeviceMotionEvent.requestPermission();
                if (response === "granted") {
                    window.addEventListener("devicemotion", handleMotion);
                }
            } else {
                window.addEventListener("devicemotion", handleMotion);
            }
        };

        requestPermission();

        return () => {
            window.removeEventListener("devicemotion", handleMotion);
        };
    }, []);

    // useEffect(() => {
    //     if (fallDetected) {
    //         
    //     }
    // }, [fallDetected]);

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Fall Detector</h1>
            {fallDetected ? (
                <h2 style={{ color: "red" }}>Fall Detected!</h2>
            ) : (
                <h2>No Fall Detected</h2>
            )}
            <div>
                <p>Acceleration X: {acceleration.x?.toFixed(2)}</p>
                <p>Acceleration Y: {acceleration.y?.toFixed(2)}</p>
                <p>Acceleration Z: {acceleration.z?.toFixed(2)}</p>
            </div>
        </div>
    );
}
