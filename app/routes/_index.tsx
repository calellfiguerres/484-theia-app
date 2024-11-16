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
        if (localStorage.getItem("firstName") == null) {
            navigate("/welcome", { replace: false });
        }
    });

    return (
        <>
            <h1>Index</h1>

            <button onClick={() => navigate("/welcome")}>Welcome</button>
            <br />

            {/* <button onClick={() => navigate("/settings")}>Settings</button> */}
            <br />
            <button onClick={() => navigate("/fall-detection-demo")}>Fall Detection</button>
        </>
    );
}
