'use server'
import Image from "next/image";
import OutBlock from "../homepage/output-para";
import { Suspense } from "react";
import OutputBlockSkeleton from "../skeletons/output-skeleton";
import { queryNatureServeEcosystem, queryNatureServeSpecies } from "@/app/lib/natureserve";
import { Data } from "@/app/lib/types";
import { parseData } from "@/app/lib/natureserve";


export async function InfoBox(location: string, species:boolean){
    location = location.toLowerCase();
    let response;
    if(!species){    
        response = await queryNatureServeSpecies(location);
    }
    else{
        response = await queryNatureServeEcosystem(location);
    }

        if((response.status) !== 200){
        return(
            <>  
                <Suspense fallback={<OutputBlockSkeleton/>}>
                    <div className="drop-shadow-xl min-w-[85vw] max-w-[85vw] w-fit text-wrap justify:center text-center 
                         p-1 rounded-lg border-[#293734] bg-[var(--main-element)]">
                        <div className='p-3 text-xl text-white'>
                            <p>Bad Input - Status Code: {await response.statusText}</p>
                        </div>
                    </div>
                </Suspense>
            </>
        );
    }
    let data = (await response.json());
    const targets: Data[] = await parseData(data);
    if(targets.length === 0){
        return(
            <>  
                <Suspense fallback={<OutputBlockSkeleton/>}>
                    <div className="drop-shadow-xl min-w-[85vw] max-w-[85vw] w-fit text-wrap justify:center text-center 
                        p-1 rounded-lg border-[#293734] bg-[var(--main-element)]">
                        <div className='p-3 text-xl text-white'>
                            <p>Invalid Address</p>
                        </div>
                    </div>
                </Suspense>
            </>
        );
    }
    console.log(targets.length);
    return(
        <>  
            <Suspense fallback={<OutputBlockSkeleton/>}>
                <div className="drop-shadow-xl min-w-[85vw] w-fit text-wrap justify:center text-center item-center p-1 rounded  mb-[1rem]">
                    <div className='p-0'>
                        {/* <p>Number Of targets: {data.results.length}</p>
                        <p>Input: {input.substring(0,2)} - {input.substring(3, 5)}</p> */}
                        {targets.map((target:Data, index:number) =>(
                                // <OutBlock key = {index} target={target.targetName} id={target.id} status={target.status}/>
                                <OutBlock key = {index} data={target} species={species}/>
                        ))}
                        ;
                    </div>
                </div>
            </Suspense>
        </>
    );
}