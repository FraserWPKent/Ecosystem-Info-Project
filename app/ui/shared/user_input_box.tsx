import Form from "next/form";
import { addNewUser } from "@/app/lib/database";
import { checkPassword } from "@/app/lib/database";

interface Props{
    message:string;
};
export default function UserInputBox({message}:Props){
    let func;
    if(message==="Login"){
        func = checkPassword;
    }
    else{
        func = addNewUser;
    }
    return(
        <>
            <div>
                <p>Please enter your account info</p>
                    {/* <Form action = {infoHandler}>

                    </Form> */}
                <Form action = {func} className="flex flex-col flex-1 justify-center content-center item-center">
                    <div className = "flex-col content-center justify-center item-center">
                        <input type="email" name = "email" className="bg-white block m-5 min-w-[50%] mx-[25%] text-center rounded-xl" placeholder="Email"></input>
                    </div>
                    <div className = "block">
                        <input type="password" name = "password" className="bg-white block m-5 min-w-[50%] mx-[25%] text-center rounded-xl" placeholder="Password"></input>
                    </div>
                    <button className="border rounded-md border-2 mx-[25%]">
                        {message}
                    </button>
                </Form>
            </div>
        </>
    );
}