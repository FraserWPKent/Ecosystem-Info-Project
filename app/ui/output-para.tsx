import Image from "next/image";

export default function OutBlock(biome:string, imageUrl:string){
    return (
        <>
            <Image
                className="rounded-xl"
                src={imageUrl}
                alt="A landscape photograph of a Desert"
                width={10000}
                height={150}
                priority
            />
            <p className={`break-normal text-white p-1 m-1 w-[100%] `}>
                {biome}
            </p>
        </>
    );
}