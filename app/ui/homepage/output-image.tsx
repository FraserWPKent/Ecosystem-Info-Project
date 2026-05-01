import Image from "next/image";
import { getImage } from "@/app/lib/natureserve";
interface Props{
    message:string;
};
export default function OutputImage({message}: Props){
    let count = 0;
    if(message === null){return null};
    let path = getImage(message);
    let type ="A landscape photograph of a ";
    
    return(
        <>
            <Image
                className="rounded-md w-full md:w-full lg:w-[50%] float-left mr-4 mb-4 h-auto"
                src={path}
                alt={type}
                width={10000}
                height={150}
                priority
                />
        </>
    );
}