'use server'
import Image from "next/image";
import OutBlock from "../homepage/output-para";
import { Suspense } from "react";
import OutputBlockSkeleton from "../skeletons/output-skeleton";
import { queryNatureServe } from "@/app/lib/natureserve";

class Data{
    public biomeName: string;
    public id: string;
    public status: string;

    constructor(){
        this.biomeName="";
        this.id = "";
        this.status = "";
    }
};

export async function InfoBox(input: string){
    const response = await queryNatureServe(input);
    if((response.status) !== 200){
        return(
            <>  
                <Suspense fallback={<OutputBlockSkeleton/>}>
                    <div className="drop-shadow-xl min-w-[85vw] max-w-[85vw] w-fit text-wrap justify:center text-center item-center p-1 bg-[#42414d] rounded">
                        <div className='p-3 text-xl text-white'>
                            <p>Bad Input - Status Code: {await response.status}</p>
                        </div>
                    </div>
                </Suspense>
            </>
        );
    }
    let data = (await response.json());
    const biomes: Data[] = [];
    for(let x = 0; x < data.results.length; x++){
        if(data.results[x].primaryCommonName === null){
            continue;
        }
        let temp = new Data();
        temp.biomeName = data.results[x].primaryCommonName;
        temp.id = data.results[x].uniqueId;
        temp.status = data.results[x].roundedGRank;
        biomes.push(temp);
    }
    if(biomes.length == 0){
        return(
            <>  
                <Suspense fallback={<OutputBlockSkeleton/>}>
                    <div className="drop-shadow-xl min-w-[85vw] max-w-[85vw] w-fit text-wrap justify:center text-center item-center p-1 bg-[#42414d] rounded">
                        <div className='p-3 text-xl text-white'>
                            <p>Invalid Address</p>
                        </div>
                    </div>
                </Suspense>
            </>
        );
    }
    return(
        <>  
            <Suspense fallback={<OutputBlockSkeleton/>}>
            
                <div className="drop-shadow-xl min-w-[85vw] max-w-[85vw] w-fit text-wrap justify:center text-center item-center p-1 bg-[#42414d] rounded">
                    <div className='p-0'>
                        {/* <p>Number Of Biomes: {data.results.length}</p>
                        <p>Input: {input.substring(0,2)} - {input.substring(3, 5)}</p> */}
                        {biomes.map((biome:Data, index:number) =>(
                                <OutBlock key = {index} biome={biome.biomeName} id={biome.id} status={biome.status}/>
                        ))};
                    </div>
                </div>
            </Suspense>
        </>
    );
}