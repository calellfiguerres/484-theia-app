import React, { useState, useEffect } from 'react';
import '../NavigationMap.css';
// import mapImage from './map.svg'; // Import the map image (use your map file path)
// import mapImage from "./thumbnail.jpg";


// import navigationMapCssUrl from "./NavigationMap.css?url"

// export const links = [
//     { rel: "stylesheet", href: navigationMapCssUrl }
// ]

const NavigationMap = () => {
    const [position, setPosition] = useState({ x: 200, y: 150 });
    const stepDistance = 1; // Distance to move per step         10
    const stepThreshold = 1.2; // Adjust based on testing         1.2
    const debounceTime = 5; // Minimum time (ms) between steps         300
    let lastPeakTime = 0;

  useEffect(() => {
    const handleMotion = (event) => {
      const { x, y, z } = event.accelerationIncludingGravity;

      const currentTime = Date.now();
      if (z > stepThreshold && currentTime - lastPeakTime > debounceTime) {
        lastPeakTime = currentTime;

        // Move the dot based on a predefined direction
        moveDot("up", stepDistance); // Change "up" to the desired direction
      }
    };

    window.addEventListener("devicemotion", handleMotion);

    return () => window.removeEventListener("devicemotion", handleMotion);
  }, []);

  const moveDot = (direction, distance) => {
    setPosition((prev) => {
      switch (direction) {
        case "up":
          return { x: prev.x, y: Math.max(0, prev.y - distance) };
        case "down":
          return { x: prev.x, y: Math.min(300, prev.y + distance) };
        case "left":
          return { x: Math.max(0, prev.x - distance), y: prev.y };
        case "right":
          return { x: Math.min(400, prev.x + distance), y: prev.y };
        default:
          return prev;
      }
    });
  };

  return (
    <div className="navigation-container">
      <h2>Indoor Navigation</h2>
      <div className="map-container">
        {/* <img src={mapImage} alt="Indoor Map" className="map" /> */}
        {/* <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" className='map'>
            <!-- Background -->
            <rect width="400" height="300" fill="#f5f5f5" />

            <!-- Walls -->
            <line x1="10" y1="10" x2="390" y2="10" stroke="black" stroke-width="3" />
            <line x1="10" y1="10" x2="10" y2="290" stroke="black" stroke-width="3" />
            <line x1="390" y1="10" x2="390" y2="290" stroke="black" stroke-width="3" />
            <line x1="10" y1="290" x2="390" y2="290" stroke="black" stroke-width="3" />

            <!-- Room Separation -->
            <line x1="10" y1="150" x2="390" y2="150" stroke="black" stroke-width="2" />

            <!-- Room Labels -->
            <text x="50" y="80" font-size="20" fill="black">Living Room</text>
            <text x="50" y="230" font-size="20" fill="black">Bedroom</text>
        </svg> */}
        {/* Overlay the moving dot */}
        <div
          className="dot"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
          }}
        ></div>
      </div>
      <p>{position.x} {position.y}</p>
    </div>
  );
};

export default NavigationMap;
// import React, { useState, useEffect } from 'react';

// const MotionTracker = () => {
//   const [x, setX] = useState(window.innerWidth / 2); // Starting x-coordinate
//   const [y, setY] = useState(window.innerHeight / 2); // Starting y-coordinate
//   const [direction, setDirection] = useState(0); // Facing direction in degrees
//   const stepSize = 10; // Distance per step in pixels

//   useEffect(() => {
//     // Request permissions if needed (for iOS)
//     const requestPermissions = async () => {
//       if (typeof DeviceMotionEvent.requestPermission === 'function') {
//         await DeviceMotionEvent.requestPermission();
//         await DeviceOrientationEvent.requestPermission();
//       }
//     };

//     requestPermissions();

//     // Device orientation event listener
//     const handleDeviceOrientation = (event) => {
//       if (event.alpha !== null) {
//         setDirection(event.alpha); // Update direction (yaw)
//       }
//     };

//     // Device motion event listener for step detection
//     let lastAcceleration = { x: 0, y: 0, z: 0 };
//     const handleDeviceMotion = (event) => {
//       const acc = event.accelerationIncludingGravity;
//       const delta = Math.sqrt(
//         (acc.x - lastAcceleration.x) ** 2 +
//         (acc.y - lastAcceleration.y) ** 2 +
//         (acc.z - lastAcceleration.z) ** 2
//       );

//       if (delta > 2) {
//         // Detected a step
//         moveDot();
//       }

//       lastAcceleration = { x: acc.x, y: acc.y, z: acc.z };
//     };

//     // Add event listeners
//     window.addEventListener('deviceorientation', handleDeviceOrientation);
//     window.addEventListener('devicemotion', handleDeviceMotion);

//     // Cleanup listeners on unmount
//     return () => {
//       window.removeEventListener('deviceorientation', handleDeviceOrientation);
//       window.removeEventListener('devicemotion', handleDeviceMotion);
//     };
//   }, []);

//   const moveDot = () => {
//     // Convert direction to radians for trigonometric calculations
//     const radian = (Math.PI / 180) * direction;

//     // Calculate new position
//     setX((prevX) => prevX + stepSize * Math.sin(radian));
//     setY((prevY) => prevY - stepSize * Math.cos(radian)); // Invert y-axis for screen coordinates
//   };

//   return (
//     <div>
//       <div
//         style={{
//           position: 'absolute',
//           width: '20px',
//           height: '20px',
//           backgroundColor: 'red',
//           borderRadius: '50%',
//           left: `${x}px`,
//           top: `${y}px`,
//           transform: 'translate(-50%, -50%)',
//         }}
//       ></div>
//     </div>
//   );
// };

// export default MotionTracker;
