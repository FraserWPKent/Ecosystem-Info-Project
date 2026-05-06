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
            <div className="flex-col w-[70vw] h-[70vh] mt-[5vh] mb-[5vh] border border-2 border-transparent 
            rounded-3xl bg-[var(--main-element)] drop-shadow-xl content-center justify-center">
                <UserInputBox message={message}/>
                <div className="mt-5 p-3 w-full rounded-md content-center justify-center item-center text-center">
                    <a className="text-white w-1/6 mx-7/12 hover:text-blue" href="../login"  >
                        Or Login
                    </a>
                </div>
            </div>
        </>
    );
}