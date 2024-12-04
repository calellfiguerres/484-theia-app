import React, { useState } from 'react';
import blank from "../Frame 1.svg?url";
import luke from "../Luke's Room.svg?url";
import alex from "../Alex's Bedroom.svg?url";
import kitchen from "../Kitchen.svg?url";
import livingRoom from "../Living Room.svg?url";

export default function VoiceCommandApp() {
    const [transcript, setTranscript] = useState('');
    const [room, setRoom] = useState('');
    const [error, setError] = useState('');
    const [isListening, setIsListening] = useState(false);

    const startVoiceCommand = () => {
        if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
            setError('Your browser does not support the Web Speech API.');
            return;
        }

        // Initialize Speech Recognition
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.lang = 'en-US'; // Set language to English
        recognition.interimResults = false; // Only return final results
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
            // setError('Listening...');
            setIsListening(true);
        };

        recognition.onerror = (event) => {
            setError(`Error: ${event.error}`);
        };

        recognition.onresult = (event) => {
            const spokenText = event.results[0][0].transcript;
            console.log('Transcript:', spokenText);

            setTranscript(spokenText);
            detectRoom(spokenText);
        };

        recognition.onend = () => {
            // setError('');
            setIsListening(false);
        };

        recognition.start();
    };

    const detectRoom = (text) => {
        const lowerText = text.toLowerCase();
        if (lowerText.includes('living room')) {
            setRoom('Living Room');
        } else if (lowerText.includes('kitchen')) {
            setRoom('Kitchen');
        } else if (lowerText.includes('alex\'s bedroom')) {
            setRoom('Alex\'s Bedroom');
        } else if (lowerText.includes('luke\'s bedroom')) {
            setRoom('Luke\'s Bedroom');
        } else {
            setRoom('Unknown Location');
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Voice Command App</h1>
            <button onClick={startVoiceCommand} disabled={isListening}>{isListening ? "Listening..." : "Start Listening"}</button>
            <div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {/* {transcript && <p>Heard: "{transcript}"</p>} */}
                {room && <p>Detected Room: {room}</p>}
                {room == "" ? <img src={blank} alt="asdlfkj" /> : null}
                {room == "Living Room" ? (<img src={livingRoom} alt="asdlfkj" />) : null}
                {room == "Kitchen" ? (<img src={kitchen} alt="asdlfkj" />) : null}
                {room == "Alex's Bedroom" ? (<img src={alex} alt="asdlfkj" />) : null}
                {room == "Luke's Bedroom" ? (<img src={luke} alt="asdlfkj" />) : null}
            </div>
        </div>
    );
};
