'use server'
import Image from "next/image";
import OutBlock from "./output-para";
export async function InfoBox(input: string){
    //I think this should be working to query the nature serve database. I need to figure out how to parse the data ive been given though.
    const response = await fetch(" https://explorer.natureserve.org/api/data/ecosystemsSearch", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            {
                criteriaType: "ecosystems",
                textCriteria : [ ],
                statusCriteria : [ ],
                locationCriteria : [{
                    paramType: "subnation",
                    subnation: "CA", 
                    nation: "US",
                }],
                pagingOptions : {
                    page : null,
                    recordsPerPage : null
                },
                recordSubtypeCriteria : [ ],
                modifiedSince : null,
                locationOptions : null,
                classificationOptions : null,
                ecosystemsTaxonomyCriteria : [ ]
            }
        )
    }
    );
    let data = (await response.text());
//     let item;
//     data = data.map((item : any) => {
    
//      const { message } = item;
//     return { message };
//     // input=recordType;
// })
    //input=String(item);
    // input = data;
    //{input = json.toString()};
    // const path = "/"+input+".jpg";
    const biomes: string[] = [];
    // let count = 0;
    let output;
    let count;
    let lastIndex = 0;
    for(count = 0; count < 10; count++){
        let index = (data.indexOf("translatedScientificName", lastIndex))+27;
        if(index === -1){
            break;
        }
        output = "";
        while(data[index] != '"'){
            output+=data[index];
            index++;
        }
        if(count === 0 || output !== biomes[count-1]){
            biomes.push(output);
            // count++;
        }
        else{
            // x--
        }
        lastIndex=index;
    }

    const path="/polar.jpg";
    return(
        <>  
            <div className="drop-shadow-xl min-w-[85vw] max-w-[85vw] w-fit text-wrap justify:center text-center item-center p-3 bg-[#42414d] rounded transition-opacity duration-1000 ease-in-out">
                <div className='p-2'>
                    {biomes.map((biome:string, index:number) =>(
                        
                        OutBlock(biome, path)
                    ))};
                    {/* <OutBlock biome={biomes[0]} imageUrl={path}/>
                    {OutBlock(biomes[0], path)}
                    {OutBlock(biomes[1], path)} */}
                {/* <Image
                        className="rounded-xl"
                        src={path}
                        alt="A landscape photograph of a Desert"
                        width={10000}
                        height={150}
                        priority
                        />
                <p
                className={`break-normal text-white p-1 m-1 w-[100%] `}>
                    {biomes[0]}
                </p>
                <p
                className={`break-normal text-white p-1 m-1 w-[100%] `}>
                    {biomes[1]}
                </p>
                <p
                className={`break-normal text-white p-1 m-1 w-[100%] `}>
                    {biomes[2]}
                </p> */}
                </div>
            </div>
        </>
    );
}