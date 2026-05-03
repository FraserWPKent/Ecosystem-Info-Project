import Image from "next/image";
import OutputImage from "../homepage/output-image";
import { getStatus } from "@/app/lib/natureserve";
import { Data } from "@/app/lib/types";
import { getSpeciesPhotoData } from "@/app/lib/iNaturalist";
import { getImageEcosystem } from "@/app/lib/natureserve";
import { ImageData } from "@/app/lib/types";

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
    let status = getStatus(data.status)
    let path;
    let imageData;
        if(!species){
            // imageData = await getSpeciesPhotoData(scientificName);
            imageData = await getSpeciesPhotoData(data.scientificName);
            // path=imageData.url;
        }
        else{
            imageData = new ImageData();
            imageData.url = getImageEcosystem(data.targetName);
            imageData.attribution="FILL THIS IN LATER";
            imageData.summary = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio optio repellat pariatur, iste veritatis nulla ipsa quas eos aperiam expedita, sequi quidem? Quod voluptatem quisquam mollitia maiores magnam illum facere. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque ut a repudiandae nemo quasi, doloribus dolores recusandae sint quia dolorum cumque deserunt nobis accusamus fugit quam ipsum inventore cupiditate doloremque! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum qui nesciunt laudantium, voluptatum consequatur maiores quaerat ad nisi nobis libero impedit deserunt? Dolorem amet, odio optio expedita voluptates sint voluptatibus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque recusandae repellendus culpa similique earum fugiat expedita atque facilis officia placeat. Accusamus iure suscipit reprehenderit nihil quos sequi inventore repellat nemo. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi incidunt blanditiis eligendi soluta, recusandae atque ducimus dolorem nulla suscipit perferendis saepe modi molestias omnis aperiam provident eum fugit similique eos. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus nisi repellendus eveniet, odio ratione mollitia facere veniam libero cupiditate quaerat deserunt placeat. Itaque possimus animi officia, excepturi non aliquid ut. Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio optio repellat pariatur, iste veritatis nulla ipsa quas eos aperiam expedita, sequi quidem? Quod voluptatem quisquam mollitia maiores magnam illum facere. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque ut a repudiandae nemo quasi, doloribus dolores recusandae sint quia dolorum cumque deserunt nobis accusamus fugit quam ipsum inventore cupiditate doloremque! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum qui nesciunt laudantium, voluptatum consequatur maiores quaerat ad nisi nobis libero impedit deserunt? Dolorem amet, odio optio expedita voluptates sint voluptatibus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque recusandae repellendus culpa similique earum fugiat expedita atque facilis officia placeat. Accusamus iure suscipit reprehenderit nihil quos sequi inventore repellat nemo. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi incidunt blanditiis eligendi soluta, recusandae atque ducimus dolorem nulla suscipit perferendis saepe modi molestias omnis aperiam provident eum fugit similique eos. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus nisi repellendus eveniet, odio ratione mollitia facere veniam libero cupiditate quaerat deserunt placeat. Itaque possimus animi officia, excepturi non aliquid ut. Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio optio repellat pariatur, iste veritatis nulla ipsa quas eos aperiam expedita, sequi quidem? Quod voluptatem quisquam mollitia maiores magnam illum facere. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque ut a repudiandae nemo quasi, doloribus dolores recusandae sint quia dolorum cumque deserunt nobis accusamus fugit quam ipsum inventore cupiditate doloremque! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum qui nesciunt laudantium, voluptatum consequatur maiores quaerat ad nisi nobis libero impedit deserunt? Dolorem amet, odio optio expedita voluptates sint voluptatibus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque recusandae repellendus culpa similique earum fugiat expedita atque facilis officia placeat. Accusamus iure suscipit reprehenderit nihil quos sequi inventore repellat nemo. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi incidunt blanditiis eligendi soluta, recusandae atque ducimus dolorem nulla suscipit perferendis saepe modi molestias omnis aperiam provident eum fugit similique eos. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus nisi repellendus eveniet, odio ratione mollitia facere veniam libero cupiditate quaerat deserunt placeat. Itaque possimus animi officia, excepturi non aliquid ut.";
        }
    if(status !== "Failure"){
        return (
            <>
                <div className="border-transparent border-4 p-2 justify-center item-center rounded-lg" >
                    {/* <OutputImage primaryName={data.targetName} scientificName={data.scientificName} type={type}/> */}
                    <OutputImage primaryName={data.targetName} path={imageData.url} attribution={imageData.attribution}/>
                    <p className={`font-bold break-normal text-white w-[100%] `}>{data.targetName}</p>
                    <p className={`font-bold break-normal text-white w-[100%] `}>{status}</p>
                    <p className = "break-normal text-white w-[100%] text-left ">
                        {imageData.summary}
                    </p>
                </div>
            </>
        );
    }
}