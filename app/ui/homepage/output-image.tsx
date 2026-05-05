import Image from "next/image";
import {getImageEcosystem } from "@/app/lib/natureserve";
import { getSpeciesPhotoData } from "@/app/lib/iNaturalist";
import { ImageData } from "@/app/lib/types";
// interface Props{
//     primaryName:string;
//     scientificName: string;
//     type:boolean;
// };
interface Props{
    primaryName:string;
    path: string;
    attribution: string;
};
export default async function OutputImage({primaryName, path, attribution}: Props){
    // let count = 0;
    if(primaryName === null){return null};
    // let path;
    // let imageData;
    // if(type){
    //     // imageData = await getSpeciesPhotoData(scientificName);
    //     imageData = await getSpeciesPhotoData(scientificName);
    //     path=imageData.url;
    // }
    // else{
    //     path = getImageEcosystem(primaryName);
    //     imageData = new ImageData();
    //     imageData.attribution="FILL THIS IN LATER";
    // }
    // let alt ="A landscape photograph of a ";
    // path.replace("square", "medium");
    return(
        <>
            <figure className="w-[80vw] float-left md:w-full lg:w-[50%] mr-4 mb-4 h-auto">
                <Image
                    className="rounded-md w-full"
                    //  src={`/${path}`}
                    src={path}
                    alt={"Photo of a " + primaryName + " by " + attribution}
                    width={1000}
                    height={250}
                    // fill
                    priority
                    />
                <figcaption className="text-center mt-[10px]">{attribution}</figcaption>
            </figure>
        </>
    );
}