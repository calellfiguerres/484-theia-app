import { Link } from "@remix-run/react";

export default function FallDetected() {
    return (
        <>
            <h1>Help Ive fallen and I cant get up!</h1>
            <h2><Link to="/test">Go Back</Link></h2>
        </>
    );
}