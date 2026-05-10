'use client';
import Form from "next/form";
import { Suspense, useState } from "react";
import {InfoBox} from "./info-output";
import OutputBlockSkeleton from "../skeletons/output-skeleton";
import TypeSwitch from "./type-switch";
import { getAddressInfo } from "@/app/lib/google";
export default function InputField(){
    const [outputVisible, setOutputVisible] = useState(false);
    const [targetSpecies, setTargetSpecies] = useState(false);
    const [outputElement, setOutputElement] = useState(<p></p> as React.ReactNode);
    
    async function inputHandler(val: FormData){
        const message = String(val.get("message"));
        console.log(message.length);
        if(message.length === 0){
            setOutputVisible(false);
        }
        else{
            setOutputElement(<OutputBlockSkeleton/>);
            const location: string = await getAddressInfo(message);
            setOutputVisible(true);
            const outputBox = await InfoBox(location, targetSpecies);
            // const outputBox = await InfoBox(message, targetSpecies);
            setOutputElement(outputBox);   
        }
    }
    return(
        <>
        {/* <div className = {` p-[5vh] w-[88vw] h-fit flex flex-col flex-2 align-center content-center bg-black drop-shadow-lg text-center  ${outputVisible ? 'mt-[5vh]' : 'mt-[30vh]'}`}> */}
            {/* <div className={` pb-[5vh] w-[100vw] drop-shadow-lg text-center  ${outputVisible ? 'pt-[5vh]' : 'pt-[20vh]'}`}> */}
                {/* ${outputVisible > 0 ? 'hidden' : 'block'} */}
                
            
                {/* md:grid  md:grid-cols-[70%_30%] lg:grid-cols-[80%_20%] md:grid-flow-col md:gap-3 */}
                <div className={`flex flex-col w-[85vw] justify-center pb-10 px-10 pt-8
                    content-center text-center items-center xs:text-left bg-[var(--main-element)] border-[#293734] border-1 rounded-md 
                    drop-shadow-lg ${outputVisible ? 'mt-[5vh] mb-[3vh]' : 'mt-[15vh] mb-[10vh]'}`}>
                    <div className={`xs:w-fit md:w-full rounded-md justify-center text-center items-center 
                        text-lg placeholder:text-gray-500 text-center mb-1`}>
                        <p className="text-white mb-1">Search type</p>
                        <TypeSwitch targetSpecies={targetSpecies} setTargetSpecies={setTargetSpecies}/>
                    </div>
                    <Form action={inputHandler} className="min-w-full mt-[1rem]">
                        {/* ${outputVisible > 0 ? 'hidden' : 'block'} */}
                        <input name = "message" className={`w-full text-center md:w-31/40 rounded-md py-[14px] px-[14px] 
                        text-white text-lg placeholder:text-gray-500 md:text-left bg-[#213230] text-black 
                        border-1 border-[#354541] drop-shadow-lg float-left`}
                        placeholder="Please input an address from the USA or CA"
                        aria-label="Address input field"
                        >
                        </input>
                        <button className="w-full my-[5px] md:my-0 md:ml md:w-2/10 content-center bg-linear-to-br from-[var(--start-focus-gradient)] 
                        to-[var(--end-focus-gradient)] rounded-lg py-[16px] text-white cursor-pointer hover:opacity-70 active:outline-2 active:outline-green-700">
                            Submit
                        </button>
                    </Form>
                    
                </div>
            {/* </div> */}
        {/* </div> */}
            <div className={`${outputVisible ? 'h-auto' : 'h-0 hidden'} w-full`}>
                <Suspense fallback={<p>Loading</p>}>
                {/* TODO: FIGURE OUT WHY THIS ISINT ACTUALY ANIMATING */}
                    <div className = {`w-full ${outputVisible ? 'animate-fadeIn' : 'opacity-0'}`}>
                        {/*   */}
                        {outputElement}
                    </div>
                </Suspense>
            </div>
        
        </>
    );
}