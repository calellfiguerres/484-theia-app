import { useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";

export default function FallDetectionDemo() {
    
    const [fallDetected, setFallDetected] = useState(false);
    const [acceleration, setAcceleration] = useState({ x: 0, y: 0, z: 0 });
    const [text, setText] = useState("asdf");

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

                navigate("/fall-detected", { replace: false });

                // Reset detection after 2 seconds
                setTimeout(() => setFallDetected(false), 2000);
            }
        };

        // Request permission for motion sensors on modern browsers
        const requestPermission = async () => {
            if (typeof DeviceMotionEvent.requestPermission === "function") {
                try {
                  const response = await DeviceMotionEvent.requestPermission();
                if (response === "granted") {
                  console.log("Device motion access granted");
                //   setText("granted");
                  startMotionTracking();
                } else {
                  console.error("Permission to access device motion denied");
                //   setText("denied")
                }
              } catch (error) {
                console.error("Error requesting device motion permission:", error);
                // setText("error: ")
              }
            } else {
              console.log("DeviceMotionEvent.requestPermission not required or not supported");
            //   setText("not supported")
              startMotionTracking();
            }
          };

          const startMotionTracking = () => {
            const handleMotion = (event) => {
              const { x, y, z } = event.accelerationIncludingGravity || {};
              console.log("Motion data:", { x, y, z });
            };
        
            window.addEventListener("devicemotion", handleMotion);

            // if (DeviceMotionEvent && typeof DeviceMotionEvent.requestPermission === "function") {
            //     DeviceMotionEvent.requestPermission();
                
            //     window.addEventListener("devicemotion", handleMotion);
            //     // window.addEventListener("deviceorientation", handleOrientation);

            // }

            return () => window.removeEventListener("devicemotion", handleMotion);
        };
        

        requestPermission();

        return () => {
            window.removeEventListener("devicemotion", handleMotion);
        };
    }, []);

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Fall Detector</h1>
            <h1>{text}</h1>
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