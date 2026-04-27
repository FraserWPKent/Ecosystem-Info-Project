'use client';
import Form from "next/form";
import { useState } from "react";
import {InfoBox} from "./info-output";
export default function InputField(){
    const [inputValue, setInputValue] = useState(0);
    const [element, setElement] = useState(<p></p> as React.ReactNode);
    async function inputHandler(val: FormData){
        const message = String(val.get("message"));
        if(message.length == 0){
            setInputValue(0);
        }
        else{
            const out = await InfoBox(message);
            setElement((out));
            setInputValue(1);
        }
    }
    return(
        <>
            <div className={` pb-[5vh] w-[66vw] drop-shadow-lg text-center  ${inputValue > 0 ? 'pt-[5vh]' : 'pt-[30vh]'}`}>
                {/* ${inputValue > 0 ? 'hidden' : 'block'} */}
                <h1 className={`text-4xl text-white  font-semibold leading-10 tracking-tight justify-center items-center bg-[#42414d] p-4 rounded-lg `}>
                    Ecosystem Informative Search
                </h1>
            </div>
            <div className="flex flex-col items-center gap-6 text-center items-center sm:text-left pb-[25vh]">
                <Form action={inputHandler}>
                    {/* ${inputValue > 0 ? 'hidden' : 'block'} */}
                    <input name = "message" className={`block w-[75vw] md:w-[75vw] lg:w-[75vw] rounded-md border border-[#A3BAC3] py-[7px] justify:center text-center items-center text-lg outline-2 placeholder:text-gray-500 text-center bg-white text-black drop-shadow-xl `}
                    placeholder="Please Input The Address You Want To Get Information About">
                    </input>
                </Form>
                <div className = {`${inputValue > 0 ? 'block' : 'hidden'}`}>
                    {element}
                </div>
            </div>
            
        </>
    );
}