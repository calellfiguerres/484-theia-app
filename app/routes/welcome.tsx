import { ActionFunctionArgs } from "@remix-run/node";
import { Form, redirect } from "@remix-run/react";

export async function clientAction({ request }: ActionFunctionArgs) {
    const formData = await request.formData()

    localStorage.setItem("firstName", formData.get("firstName") as string);
    localStorage.setItem("lastName", formData.get("lastName") as string);
    localStorage.setItem("disability", formData.get("disability") as string);
    localStorage.setItem("emergencyContact", formData.get("emergencyContact") as string);
    localStorage.setItem("elevators", formData.get("elevators") as string);
    localStorage.setItem("guideDog", formData.get("guideDog") as string);
    localStorage.setItem("cane", formData.get("cane") as string);

    return redirect("/");
}

export default function Welcome() {
    return (
        <>
            <Form method="POST">
                <p>First Name</p>
                <input type="text" id="name" name="firstName" />

                <p>Last Name</p>
                <input type="text" id="name" name="lastName" />

                <p>Disability</p>
                <input type="text" id="name" name="disability" />

                <p>Emergency Contact</p>
                <input type="text" id="name" name="emergencyContact" />

                <p>Prefer Elevators?</p>
                <input type="checkbox" id="elevators" name="elevators" />

                <p>Do you have a guide dog?</p>
                <input type="checkbox" id="elevators" name="guideDog" />

                <p>Do you have a cane?</p>
                <input type="checkbox" id="elevators" name="cane" />

                <br />

                <button type="submit">Submit</button>
            </Form>
            {/* <h1>Welcome</h1> */}
        </>
    )
}