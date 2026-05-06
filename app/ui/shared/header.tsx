import Image from "next/image";
import Link from "next/link";
import LogInButton from "./login-button";
// import "../globals.css";
export default function Header(){
    return(
        <>
        {/* grid grid-cols-[95%_5%] justify-items-center*/}
            <div className="flex flex-col flex-3 justify-left align-center bg-[var(--main-element)] w-[95vw] h-fit drop-shadow-xl border border-[#293734] border-1 py-[5px] rounded-2xl m-[1rem]">
                <Link href="../">
                    <Image
                                className="rounded-full border-[var(--end-focus-gradient)] border-1 box-shadow-xl bg-[var(--background)] w-[3rem] h-auto drop-shadow-xl flex-1 mx-[1rem] my-[3px] p-1"
                                src={"/Icons/tree-silhouette.png"}
                                alt={"A small tree icon that can be clicked to redirect to the main page"}
                                width={55}
                                height={55}
                                priority
                                />
                                
                </Link>
                {/* <h1 className="float-left">EcoSearch</h1> */}
                <LogInButton/>

            </div>
        </>
    );
}