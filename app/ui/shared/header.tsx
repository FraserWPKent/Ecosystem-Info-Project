import Image from "next/image";
import Link from "next/link";
import LogInButton from "./login-button";
export default function Header(){
    return(
        <>
        {/* grid grid-cols-[95%_5%] justify-items-center*/}
            <div className="flex flex-col flex-2 justify-left align-center bg-[#2d2d35ed] w-[95vw] h-fit drop-shadow-xl border border-black border-1 py-[5px] rounded-2xl m-[5px]">
                <Link href="../">
                    <Image
                                className="rounded-md w-[3rem] h-auto drop-shadow-xl flex-1 mx-[1rem] my-[3px]"
                                src={"/Icons/tree-silhouette.png"}
                                alt={"A small tree icon that can be clicked to redirect to the main page"}
                                width={1}
                                height={1}
                                priority
                                />
                    {/* <h1 className="floatRight">EcoSearch</h1> */}
                </Link>
                <LogInButton/>

            </div>
        </>
    );
}