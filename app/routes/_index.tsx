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
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem("welcomeCompleted") == null) {
            navigate("/welcome", { replace: false });
        }
    });

    return (
        <>
            <h1>Theia App</h1>

            {/* <button onClick={() => navigate("/welcome")}>Welcome</button>
            <br />
            <br /> */}
            <button onClick={() => navigate("/test")}>Fall Detection</button>
            <br />
            <br />
            <button onClick={() => navigate("/voice")}>Voice Navigation</button>
            <br />
            <br />
            <button onClick={() => navigate("/settings")}>Settings</button>
        </>
    );
}
