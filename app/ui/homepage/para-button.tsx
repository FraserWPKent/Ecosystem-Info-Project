// "use client";
import { addArrayElementToDatabase } from "@/app/lib/database";
import Form from "next/form";
interface Props{
    id: string;
    species: boolean;
};
export default function Button({id, species}: Props){    
    async function addElement(){
            "use server";
            await addArrayElementToDatabase(id, species);
    }
    return(
        <>
            {/* <Form action={addArrayElementToDatabase}> */}
            <Form action = {addElement}>
                <button type="submit" className= "p-4 px-1000, border-1 rounded-xl bg-blue">Press to add this element to your saved list</button>
                {/* <input type = "hidden" value={id} name="id"></input>
                <input type = "hidden" value={String(species)} name="species"></input> */}
            </Form>
        </>
    );
}