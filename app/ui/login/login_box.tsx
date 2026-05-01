'use client';
import { addNewUser } from "@/app/lib/database";
import Form from "next/form";
interface Props{
    message:string;
};
export default function LoginBox({message}:Props){
    return (
        <>
            {/* <div className="grid grid-cols-[100%] items-center"> */}
                <div className="flex-col w-[70vw] h-[90vh] mt-[5vh] mb-[5vh] border border-2 border-transparent rounded-xl bg-[#42414d] drop-shadow-xl content-center justify-center">
                    <p>Please enter your account info</p>
                    {/* <Form action = {infoHandler}>

                    </Form> */}
                    <Form action = {addNewUser} className="flex flex-col flex-1 justify-center content-center item-center">
                        <div className = "flex-col content-center justify-center item-center">
                            <input name = "email" className="bg-white block m-5 min-w-[50%] mx-[25%] text-center rounded-xl" placeholder="Email"></input>
                        </div>
                        <div className = "block">
                            <input name = "password" className="bg-white block m-5 min-w-[50%] mx-[25%] text-center rounded-xl" placeholder="Password"></input>
                        </div>
                        <button className="border rounded-md border-2 mx-[25%]">
                            {message}
                        </button>
                        <p>
                            Or Create an account
                        </p>
                    </Form>
                </div>
            {/* </div> */}
        </>
    );
}