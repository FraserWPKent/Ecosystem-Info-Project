'use client';
// import { addNewUser } from "@/app/lib/database";
// import Form from "next/form";
import UserInputBox from "../shared/user_input_box";
interface Props{
    message:string;
};
export default function SignupBox({message}:Props){
    return (
        <>
            <div className="flex-col w-[90vw] h-[80vh] mt-[5vh] mb-[5vh] border border-2 border-transparent 
            rounded-lg bg-[var(--main-element)] drop-shadow-xl content-center justify-center text-center">
                <UserInputBox message={message}/>
                <div className="mt-5 p-3 w-full rounded-md">
                    <a className="text-white w-1/6 mx-7/12 px-[2rem] py-[1rem] rounded-md hover:bg-[#213230] active:outline-1" href="../login"  >
                        Login
                    </a>
                </div>
            </div>
        </>
    );
}