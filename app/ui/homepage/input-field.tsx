'use client';
import Form from "next/form";
import { Suspense, useState } from "react";
import {InfoBox} from "./info-output";
import OutputBlockSkeleton from "../skeletons/output-skeleton";
import TypeSwitch from "./type-switch";
export default function InputField(){
    const [outputVisible, setOutputVisible] = useState(false);
    const [targetSpecies, setTargetSpecies] = useState(false);
    const [outputElement, setOutputElement] = useState(<p></p> as React.ReactNode);
    
    async function inputHandler(val: FormData){
        const message = String(val.get("message"));
        if(message.length === 0){
            setOutputVisible(false);
        }
        else{
            setOutputElement(<OutputBlockSkeleton/>);
            setOutputVisible(true);
            const outputBox = await InfoBox(message, targetSpecies);
            setOutputElement(outputBox);   
        }
    }
    return(
        <>
        {/* <div className = {` p-[5vh] w-[88vw] h-fit flex flex-col flex-2 align-center content-center bg-black drop-shadow-lg text-center  ${outputVisible ? 'mt-[5vh]' : 'mt-[30vh]'}`}> */}
            {/* <div className={` pb-[5vh] w-[100vw] drop-shadow-lg text-center  ${outputVisible ? 'pt-[5vh]' : 'pt-[20vh]'}`}> */}
                {/* ${outputVisible > 0 ? 'hidden' : 'block'} */}
                
            
                {/* md:grid  md:grid-cols-[70%_30%] lg:grid-cols-[80%_20%] md:grid-flow-col md:gap-3 */}
                <div className={`flex flex-col w-[75vw] justify-center pb-10 px-10 pt-8
                    content-center text-center items-center xs:text-left bg-[var(--main-element)] border-[#293734] border-1 rounded-2xl 
                    drop-shadow-2xl ${outputVisible ? 'mt-[5vh] mb-[5vh]' : 'mt-[20vh] mb-[35vh]'}`}>
                    <div className={`xs:w-fit md:w-full rounded-md justify:center text-center items-center 
                        text-lg placeholder:text-gray-500 text-center mb-1`}>
                        <p className="text-white mb-1">Search type</p>
                        <TypeSwitch targetSpecies={targetSpecies} setTargetSpecies={setTargetSpecies}/>
                    </div>
                    <Form action={inputHandler} className="min-w-1/1">
                        {/* ${outputVisible > 0 ? 'hidden' : 'block'} */}
                        <input name = "message" className={`w-full md:w-8/10 rounded-md border border-[#A3BAC3] py-[7px] 
                        justify:center text-center items-center text-lg outline-2 placeholder:text-gray-500 text-center bg-white text-black 
                        drop-shadow-xl float-left`}
                        placeholder="Address">
                        </input>
                        <button className="w-full md:w-2/10 content-center bg-linear-to-br from-[var(--start-focus-gradient)] 
                        to-[var(--end-focus-gradient)] rounded-lg py-[10px] text-white">
                            Submit
                        </button>
                    </Form>
                    
                </div>
            {/* </div> */}
        {/* </div> */}
            <div className={`${outputVisible ? 'h-auto' : 'h-0'}`}>
                <Suspense fallback={<p>Loading</p>}>
                {/* TODO: FIGURE OUT WHY THIS ISINT ACTUALY ANIMATING */}
                    <div className = {`${outputVisible ? 'animate-fadeIn' : 'opacity-0'}`}>
                        {outputElement}
                    </div>
                </Suspense>
            </div>
        
        </>
    );
}