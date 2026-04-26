'use client';
import Form from "next/form";
import { useState } from "react";
import {InfoBox} from "./info-output";
export default function InputField(){
    const [inputValue, setInputValue] = useState(0);
    const [element, setElement] = useState("A");
    async function inputHandler(val: FormData){
        const message = String(val.get("message"));
        if(message.length == 0){
            setInputValue(0);
        }
        else{
            const out = await InfoBox(message);
            setElement(String(out));
            setInputValue(1);
        }
    }
    return(
        <>
            <Form action={inputHandler}>
                <input name = "message" className={`block w-[75vw] md:w-[75vw] lg:w-[75vw] rounded-md border border-[#A3BAC3] py-[7px] justify:center text-lg outline-2 placeholder:text-gray-500 text-center bg-white text-black drop-shadow-xl ${inputValue > 0 ? 'hidden' : 'block'}`}
                placeholder="Please Input The Address You Want To Get Information About">
                </input>
            </Form>
            <div className = {`${inputValue > 0 ? 'block' : 'hidden'}`}>
                {element}
            </div>
            
        </>
    );
}