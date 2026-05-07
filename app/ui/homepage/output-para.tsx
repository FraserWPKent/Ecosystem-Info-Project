// "use client";
import OutputImage from "../homepage/output-image";
import { getStatus } from "@/app/lib/natureserve";
import { Data } from "@/app/lib/types";
import { getSpeciesPhotoData } from "@/app/lib/iNaturalist";
import { getImageEcosystemData } from "@/app/lib/natureserve";
import { ImageData } from "@/app/lib/types";
import { addArrayElementToDatabase } from "@/app/lib/database";
import Button from "./para-button";

// interface Props{
//     target:string;
//     id:string;
//     status:string;
// };
interface Props{
    data: Data;
    species: boolean;
};
// export default function OutBlock(biome:string, imageUrl:string){
export default async function OutBlock({data, species}: Props){
    
    let status = await getStatus(data.status)
    // let path;
    let imageData;
        if(!species){
            // imageData = await getSpeciesPhotoData(scientificName);
            imageData = await getSpeciesPhotoData(data.scientificName);
            // path=imageData.url;
        }
        else{
            imageData = new ImageData();
            // imageData.url = await getImageEcosystemData(data.targetName);
            imageData.url="/Error.jpg"
            imageData.attribution="FILL THIS IN LATER";
            // imageData.summary = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio optio repellat pariatur, iste veritatis nulla ipsa quas eos aperiam expedita, sequi quidem? Quod voluptatem quisquam mollitia maiores magnam illum facere. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque ut a repudiandae nemo quasi, doloribus dolores recusandae sint quia dolorum cumque deserunt nobis accusamus fugit quam ipsum inventore cupiditate doloremque! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum qui nesciunt laudantium, voluptatum consequatur maiores quaerat ad nisi nobis libero impedit deserunt? Dolorem amet, odio optio expedita voluptates sint voluptatibus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque recusandae repellendus culpa similique earum fugiat expedita atque facilis officia placeat. Accusamus iure suscipit reprehenderit nihil quos sequi inventore repellat nemo. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi incidunt blanditiis eligendi soluta, recusandae atque ducimus dolorem nulla suscipit perferendis saepe modi molestias omnis aperiam provident eum fugit similique eos. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus nisi repellendus eveniet, odio ratione mollitia facere veniam libero cupiditate quaerat deserunt placeat. Itaque possimus animi officia, excepturi non aliquid ut. Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio optio repellat pariatur, iste veritatis nulla ipsa quas eos aperiam expedita, sequi quidem? Quod voluptatem quisquam mollitia maiores magnam illum facere. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque ut a repudiandae nemo quasi, doloribus dolores recusandae sint quia dolorum cumque deserunt nobis accusamus fugit quam ipsum inventore cupiditate doloremque! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum qui nesciunt laudantium, voluptatum consequatur maiores quaerat ad nisi nobis libero impedit deserunt? Dolorem amet, odio optio expedita voluptates sint voluptatibus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque recusandae repellendus culpa similique earum fugiat expedita atque facilis officia placeat. Accusamus iure suscipit reprehenderit nihil quos sequi inventore repellat nemo. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi incidunt blanditiis eligendi soluta, recusandae atque ducimus dolorem nulla suscipit perferendis saepe modi molestias omnis aperiam provident eum fugit similique eos. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus nisi repellendus eveniet, odio ratione mollitia facere veniam libero cupiditate quaerat deserunt placeat. Itaque possimus animi officia, excepturi non aliquid ut. Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio optio repellat pariatur, iste veritatis nulla ipsa quas eos aperiam expedita, sequi quidem? Quod voluptatem quisquam mollitia maiores magnam illum facere. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque ut a repudiandae nemo quasi, doloribus dolores recusandae sint quia dolorum cumque deserunt nobis accusamus fugit quam ipsum inventore cupiditate doloremque! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum qui nesciunt laudantium, voluptatum consequatur maiores quaerat ad nisi nobis libero impedit deserunt? Dolorem amet, odio optio expedita voluptates sint voluptatibus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque recusandae repellendus culpa similique earum fugiat expedita atque facilis officia placeat. Accusamus iure suscipit reprehenderit nihil quos sequi inventore repellat nemo. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi incidunt blanditiis eligendi soluta, recusandae atque ducimus dolorem nulla suscipit perferendis saepe modi molestias omnis aperiam provident eum fugit similique eos. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus nisi repellendus eveniet, odio ratione mollitia facere veniam libero cupiditate quaerat deserunt placeat. Itaque possimus animi officia, excepturi non aliquid ut.";
            imageData.summary = "";
        }
    if(status !== "Failure"){
        return (
            <>
                <div className="border-1 p-2 my-3 rounded-lg border-[#293734] bg-[var(--main-element)] drop-shadow-xl overflow-hidden w-full" 
                    // style={{display: "flex", flexDirection: "row"}}
                    >
                    {/* flex flex-col md:flex-row */}

                    {/* <OutputImage primaryName={data.targetName} scientificName={data.scientificName} type={type}/> */}
                    {/* <div className="basis-1/2 shrink-0"> */}
                    <div className="w-full"
                    // style={{width:"100%"}}
                    >
                        <OutputImage 
                        primaryName={data.targetName} 
                        path={imageData.url} 
                        attribution={imageData.attribution} 
                        />
                    </div>
                    {/* <div className="flex-1 min-w-0"> */}
                    <div className="w-full pl-[1rem]" 
                    // style={{width:"100%", paddingLeft:"1rem"}}
                    >
                        <div className={`w-full text-center ${imageData.summary==="" ? 'py-1/2' : ''}`}>
                            <p className={`font-bold break-normal text-white w-full flex-1`}>{data.targetName}</p>
                            <p className={`font-bold break-normal text-white w-full mb-4 flex-1`}>{status}</p>
                        </div>
                    {/* <Button id = {data.id} species = {species}/> */}
                        <p className = "break-normal text-white w-full text-left whitespace-pre-line">
                            {imageData.summary}
                        </p>
                    </div>
                </div>
            </>
        );
    }
}