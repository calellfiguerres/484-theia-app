import { Link } from "@remix-run/react";

export default function FallDetected() {
    return (
        <>
            <h1>Help I&apos;ve fallen and I can&apos;t get up!</h1>
            <h2>Calling {localStorage.getItem("emergencyContact")}</h2>
            <h3><Link to="/test">Go Back</Link></h3>
        </>
    );
}