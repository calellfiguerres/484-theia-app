import { ClientActionFunctionArgs, Form, Link, redirect, useLoaderData } from "@remix-run/react";

export function clientLoader() {
    return {
        firstName: localStorage.getItem("firstName") || "",
        lastName: localStorage.getItem("lastName") || "",
        disability: localStorage.getItem("disability") || "",
        emergencyContact: localStorage.getItem("emergencyContact") || "",
        elevators: localStorage.getItem("elevators") || "",
        guideDog: localStorage.getItem("guideDog") || "",
        cane: localStorage.getItem("cane") || "",
        welcomeCompleted: localStorage.getItem("welcomeCompleted") || ""
    };
}

export async function clientAction({ request }: ClientActionFunctionArgs) {
    const formData = await request.formData()

    localStorage.setItem("firstName", formData.get("firstName") as string);
    localStorage.setItem("lastName", formData.get("lastName") as string);
    localStorage.setItem("disability", formData.get("disability") as string);
    localStorage.setItem("emergencyContact", formData.get("emergencyContact") as string);
    localStorage.setItem("elevators", formData.get("elevators") as string);
    localStorage.setItem("guideDog", formData.get("guideDog") as string);
    localStorage.setItem("cane", formData.get("cane") as string);

    if (formData.get("clearSettings")) {
        localStorage.clear();
    }

    return redirect("/");
}

export default function Settings() {
    const loaderData = useLoaderData<typeof clientLoader>();

    return (
        <>
            <h2><Link to="/">Go Back</Link></h2>
            <h1>Settings</h1>
            <Form method="POST">
                <p>First Name</p>
                <input type="text" id="name" name="firstName" defaultValue={loaderData.firstName}/>

                <p>Last Name</p>
                <input type="text" id="name" name="lastName" defaultValue={loaderData.lastName}/>

                <p>Disability</p>
                <input type="text" id="name" name="disability" defaultValue={loaderData.disability}/>

                <p>Emergency Contact</p>
                <input type="text" id="name" name="emergencyContact" defaultValue={loaderData.emergencyContact}/>

                <p>Prefer Elevators?</p>
                <input type="checkbox" id="elevators" name="elevators" defaultChecked={loaderData.elevators === "on"}/>

                <p>Do you have a guide dog?</p>
                <input type="checkbox" id="elevators" name="guideDog" defaultChecked={loaderData.guideDog === "on"}/>

                <p>Do you have a cane?</p>
                <input type="checkbox" id="elevators" name="cane" defaultChecked={loaderData.cane === "on"}/>

                <p>Clear Settings</p>
                <input type="checkbox" name="clearSettings" />
                <br />
                <br />
                <button type="submit">Submit</button>
            </Form>
        </>
    )
}