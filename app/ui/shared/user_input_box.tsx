import Form from "next/form";
// import { addNewUser } from "@/app/lib/database";
// import { checkPassword } from "@/app/lib/database";
import { checkPassword } from "@/app/lib/database";
import { addNewUser } from "@/app/lib/database";
// import { useState } from "react";
interface Props{
    message:string;
};
export default function UserInputBox({message}:Props){
    // let [state, setState] = useState();
    async function setupDataBaseQuery(formData: FormData){
        try{
            let data;
            if(message==="Login"){
                console.log("Loging In");
                data = await checkPassword(formData);
            }
            else{  
                console.log("Adding a New User");
                data = await addNewUser(formData);
            }
            console.log(data);
        } catch(err){
            console.log(err);
        }
    }
    let func;
    return(
        <>
            <div>
                <h1 className="text-white text-3xl mb-[1rem]">Please enter your account info</h1>
                {/* <p></p> */}
                <Form action = {setupDataBaseQuery} className="flex flex-col flex-1 justify-center content-center items-center">
                    <div className = "flex w-full flex-col-1 content-center justify-center align-center">
                        <input type="email" name = "email" className="text-white bg-[#213230] block mb-5 min-w-7/8 mx-1/16 text-center rounded-md py-[1rem]
                        border-[#293734] border-1 drop-shadow-lg" 
                        placeholder="Email Address"></input>
                    </div>
                    <div className = "flex w-full flex-col-1 block justify-center items-center text-center">
                        <input type="password" name = "password" className="text-white bg-[#213230] block mb-5 min-w-7/8 mx-1/16 text-center rounded-md py-[1rem] 
                        border-[#293734] border-1 drop-shadow-lg" 
                        placeholder="Password"></input>
                    </div>
                    <button className="w-3/8 content-center justify-center text-center bg-linear-to-br from-[var(--start-focus-gradient)] 
                        to-[var(--end-focus-gradient)] rounded-lg py-[10px] text-white hover:drop-shadow-5xl cursor-pointer">
                        {message}
                    </button>
                </Form>
            </div>
        </>
    );
}