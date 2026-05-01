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
            <div className="flex-col w-[70vw] h-[90vh] mt-[5vh] mb-[5vh] border border-2 border-transparent rounded-xl bg-[#42414d] drop-shadow-xl content-center justify-center">
                <UserInputBox message={message}/>
                <a href="../login">
                    Or Login
                </a>
            </div>
        </>
    );
}