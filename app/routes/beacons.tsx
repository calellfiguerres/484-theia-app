// import { useEffect, useState } from "react";

// export default function Beacons() {
//     const [device, setDevice] = useState("None");
//     console.log("hello, console!");
//     let currentBeacon = null;
//     const startBeaconDetection = () => {
//         navigator.bluetooth.requestDevice({
//             filters: [{ name: 'ESP32_Beacon' }] // Adjust this for your beacon's UUID
//         })
//         .then(device => {
//             console.log('Device found:', device);

//             device.addEventListener("advertisementreceived", (event) => {
//                 setDevice(event.rssi);
//             })
//         });
//     };

//     // useEffect(() => {
//     //     // setDevice(navigator.bluetooth.requestDevice({filters:[{name: "ESP32_Beacon"}]}));

//     //     // Call this function when the app loads to start detecting the beacon
//     // }, []);

//     return (
//         <>
//             <button onClick={startBeaconDetection}>Request Devices</button>
//             <p>{device}</p>
//         </>
//     )
// }

// import React, { useRef, useState } from 'react';

// const BeaconDetector = () => {
//     const [device, setDevice] = useState(null);
//     const [rssi, setRssi] = useState(null);
//     const [error, setError] = useState(null);
//     const lastUpdateTime = useRef(Date.now());

//     // eslint-disable-next-line @typescript-eslint/ban-types
//     function debounce(func: Function, delay: number) {
//         let timerId;
//         return function (...args) {
//             clearTimeout(timerId);
//             timerId = setTimeout(() => func.apply(this, args), delay);
//         }
//     }

//     const calculateDistance = (rssi) => {
//         // const currentTime = Date.now();
//         // if (currentTime - lastUpdateTime.current < 1000) {
//         //     return;
//         // }
//         // lastUpdateTime.current = currentTime;


//         const txPower = -55; // The measured RSSI at 1 meter distance (this value is usually fixed for a specific beacon)
//         if (rssi === 0) return -1.0; // No signal detected
      
//         const ratio = rssi * 1.0 / txPower;
//         if (ratio < 1.0) {
//           return Math.pow(ratio, 10);
//         } else {
//           const distance = (0.89976) * Math.pow(ratio, 7.7095) + 0.111;
//           return distance;
//         }
//     };

//     const startBeaconDetection = async () => {
//         try {
//             const requestedDevice = await navigator.bluetooth.requestDevice({
//                 filters: [{ name: 'ESP32_Beacon' }] // Adjust for your beacon's name or UUID
//             });

//             console.log('Device found:', requestedDevice);
//             setDevice(requestedDevice);

//             // const debouncedSetRssi = debounce((event) => {
//                 // setRssi(event.rssi);
//             // }, 1500, false);

//             // Add an event listener for advertisements
//             requestedDevice.addEventListener('advertisementreceived', (event) => {
//             //     console.log('Advertisement received:', event);
//                 // setRssi(event.rssi); // Update RSSI state
//                 debounce(setRssi, 100)(event.rssi);
//             });

//             // requestedDevice.addEventListener("advertisementreceived", debouncedSetRssi);

//             await requestedDevice.watchAdvertisements();
//             console.log('Started watching advertisements');
//         } catch (err) {
//             console.error('Error during beacon detection:', err);
//             setError(err.message);
//         }
//     };

//     return (
//         <div>
//             <h1>Beacon Detector</h1>
//             <button onClick={startBeaconDetection}>Start Detection</button>
//             {device && <p>Connected to: {device.name}</p>}
//             {rssi !== null && <p>RSSI: {rssi}; Distance: {(() => {
//                 // const currTime = Date.now();
//                 // if (currTime - lastUpdateTime.current < 1000) {
//                 //     return calculateDistance(rssi);
//                 // }
//                 return calculateDistance(rssi);
//             })()}</p>}
//             {error && <p style={{ color: 'red' }}>Error: {error}</p>}
//         </div>
//     );
// };

// export default BeaconDetector;

import React, { useRef, useState } from 'react';

const BeaconDetector = () => {
    const [device, setDevice] = useState(null);
    const [rssi, setRssi] = useState(null);
    const [error, setError] = useState(null);
    const lastUpdateTime = useRef(Date.now());

    // Debounce function
    function debounce(func, delay) {
        let timerId;
        return function (...args) {
            if (timerId) clearTimeout(timerId);
            timerId = setTimeout(() => func.apply(this, args), delay);
        };
    }

    // Function to calculate distance from RSSI
    const calculateDistance = (rssi) => {
        const txPower = -55; // The measured RSSI at 1 meter distance
        if (rssi === 0) return -1.0; // No signal detected

        const ratio = rssi * 1.0 / txPower;
        if (ratio < 1.0) {
            return Math.pow(ratio, 10);
        } else {
            const distance = 0.89976 * Math.pow(ratio, 7.7095) + 0.111;
            return distance;
        }
    };

    // Start detecting beacons
    const startBeaconDetection = async () => {
        try {
            const requestedDevice = await navigator.bluetooth.requestDevice({
                filters: [{ name: 'ESP32_Beacon' }] // Adjust for your beacon's name or UUID
            });

            console.log('Device found:', requestedDevice);
            setDevice(requestedDevice);

            // Define the debounced RSSI updater
            const debouncedSetRssi = debounce((event) => {
                console.log('Debounced RSSI:', event.rssi);
                setRssi(event.rssi);
            }, 1000); // Adjust debounce delay as needed

            // Add an event listener for advertisements
            requestedDevice.addEventListener('advertisementreceived', (event) => {
                console.log('Advertisement received:', event);
                debouncedSetRssi(event);
            });

            await requestedDevice.watchAdvertisements();
            console.log('Started watching advertisements');
        } catch (err) {
            console.error('Error during beacon detection:', err);
            setError(err.message);
        }
    };

    return (
        <div>
            <h1>Beacon Detector</h1>
            <button onClick={startBeaconDetection}>Start Detection</button>
            {device && <p>Connected to: {device.name}</p>}
            {rssi !== null && (
                <p>
                    RSSI: {rssi}; Distance: {calculateDistance(rssi).toFixed(2)} meters
                </p>
            )}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        </div>
    );
};

export default BeaconDetector;