'use client';
// import { addNewUser } from "@/app/lib/database";
// import Form from "next/form";
import UserInputBox from "../shared/user_input_box";
interface Props{
    message:string;
};
export default function LoginBox({message}:Props){
    return (
        <>
        {/* border-[#293734] */}
            <div className=" w-[70vw] h-[70vh] mt-[5vh] mb-[5vh] border border-2 border-transparent rounded-lg bg-[var(--main-element)] 
            content-center justify-center drop-shadow-xl">
                <UserInputBox message={message}/>
                <div className="mt-5 p-3 w-full rounded-md content-center justify-center item-center text-center">
                    <a className="text-white w-1/6 mx-7/12 hover:text-blue" href="../signup"  >
                        Or Create an account
                    </a>
                </div>
            </div>
            {/* <div className="grid grid-cols-[100%] items-center"> */}
                {/* <div className="flex-col w-[70vw] h-[90vh] mt-[5vh] mb-[5vh] border border-2 border-transparent rounded-xl bg-[#42414d] drop-shadow-xl content-center justify-center">
                    <p>Please enter your account info</p>
                    // <Form action = {infoHandler}>

                    // </Form>
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
                        <a href="">
                            Or Create an account
                        </a>
                    </Form>
                </div> */}
            {/* </div> */}
        </>
    );
}