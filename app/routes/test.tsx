import { useNavigate } from '@remix-run/react';
import React, { useEffect, useState } from 'react';

const DeviceAcceleration = () => {
  const [acceleration, setAcceleration] = useState({
    x: null,
    y: null,
    z: null,
  });
  const navigate = useNavigate();

  
  const [fallDetected, setFallDetected] = useState(false);

  useEffect(() => {
    const handleMotion = (event) => {
      if (event.acceleration) {
        setAcceleration({
          x: event.acceleration.x || 0,
          y: event.acceleration.y || 0,
          z: event.acceleration.z || 0,
        });


        const magnitude = Math.sqrt(
            (event.acceleration.x || 0) ** 2 + 
            (event.acceleration.y || 0) ** 2 + 
            (event.acceleration.z || 0) ** 2
        );


        if (magnitude > 25) {
            setFallDetected(true);

            navigate("/fall-detected", { replace: false });
        }
      }
    };

    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', handleMotion);
    } else {
      console.warn('DeviceMotionEvent is not supported on this browser.');
    }

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('devicemotion', handleMotion);
    };
  }, []);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '1rem' }}>
      <h2>Device Acceleration</h2>
      <h2>Fall Detected: {fallDetected ? "true" : "false"}</h2>
      <p><strong>X:</strong> {acceleration.x !== null ? acceleration.x.toFixed(2) : 'N/A'}</p>
      <p><strong>Y:</strong> {acceleration.y !== null ? acceleration.y.toFixed(2) : 'N/A'}</p>
      <p><strong>Z:</strong> {acceleration.z !== null ? acceleration.z.toFixed(2) : 'N/A'}</p>
    </div>
  );
};

export default DeviceAcceleration;
