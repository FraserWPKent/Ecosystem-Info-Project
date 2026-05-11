"use client";
import Form from "next/form";
// import { addNewUser } from "@/app/lib/database";
// import { checkPassword } from "@/app/lib/database";
import { checkPassword } from "@/app/lib/neon";
import { addNewUser } from "@/app/lib/neon";
import { useState } from "react";
import { text } from "stream/consumers";
interface Props{
    message:string;
};
export default function UserInputBox({message}:Props){
    let [username, setUsername] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    // let [color, setColor] = useState("bg-[#6e6b6a]");
    let [disabled, setDisabled] = useState(true);
    function checkFilled(){
        if(email && password && username){
            // setdisabled("bg-linear-to-br from-[var(--start-focus-gradient)] to-[var(--end-focus-gradient)]");
            setDisabled(false);
        }
        else{
            // setdisabled("bg-[#6e6b6a]")
            setDisabled(true);
        }
    }
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
            setDisabled(true);
            // console.log(data);
        } catch(err){
            // console.log(err);
        }
    }
    // let func;
    return(
        <>
            <div>
                <h1 className="text-white text-3xl mb-[1rem]">Please enter your account info</h1>
                {/* <p></p> */}
                <Form action = {setupDataBaseQuery} className="flex flex-col flex-1 justify-center content-center items-center">
                    <div className = "flex w-full flex-col-1 content-center justify-center align-center">
                        <input type="text" name = "username" className="text-white bg-[#213230] block mb-5 min-w-7/8 mx-1/16 text-center rounded-md py-[1rem]
                        border-[#354541] border-1 drop-shadow-lg" 
                        placeholder="Username" 
                        aria-label="Input field for a users username"
                        required
                        onChange={(e)=>{
                            setUsername(e.currentTarget.value); 
                            console.log("Target "+ e.currentTarget.value); 
                            console.log("Stored "+ username); 
                            checkFilled();}}>
                        </input>
                    </div>
                    <div className = "flex w-full flex-col-1 content-center justify-center align-center">
                        <input type="email" name = "email" className="text-white bg-[#213230] block mb-5 min-w-7/8 mx-1/16 text-center rounded-md py-[1rem]
                        border-[#354541] border-1 drop-shadow-lg" 
                        placeholder="Email Address" 
                        aria-label="Input field for a users email address"
                        required
                        onChange={(e)=>{
                            setEmail(e.currentTarget.value); 
                            console.log("Target "+ e.currentTarget.value); 
                            console.log("Stored "+ email); 
                            checkFilled();}}>
                        </input>
                    </div>
                    <div className = "flex w-full flex-col-1 block justify-center items-center text-center">
                        <input type="password" name = "password" className="text-white bg-[#213230] block mb-5 min-w-7/8 mx-1/16 text-center rounded-md py-[1rem] 
                        border-[#354541] border-1 drop-shadow-lg" 
                        placeholder="Password" 
                        aria-label="Input field for a users password"
                        required
                        onChange={
                            (e)=>{setPassword(e.currentTarget.value); 
                                console.log("Target "+ e.currentTarget.value); 
                                console.log("Stored "+ password); 
                                checkFilled();}
                            }>
                        </input>
                    </div>
                    <button
                    disabled={disabled}
                    className={`w-3/8 content-center justify-center text-center  rounded-lg py-[10px] text-white hover:drop-shadow-5xl 
                    cursor-pointer ${disabled} disabled:bg-[#6e6b6a] enabled:bg-linear-to-br enabled:from-[var(--start-focus-gradient)] 
                    enabled:to-[var(--end-focus-gradient)] enabled:hover:opacity-70` }>
                        {/* bg-linear-to-br from-[var(--start-focus-gradient)]  */}
                        {/* to-[var(--end-focus-gradient)] */}
                        {message}
                    </button>
                </Form>
            </div>
        </>
    );
}