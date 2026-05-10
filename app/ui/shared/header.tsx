import Image from "next/image";
import Link from "next/link";
import LogInButton from "./login-button";
// import "../globals.css";
export default function Header(){
    return(
        <>
        {/* grid grid-cols-[95%_5%] justify-items-center*/}
            <div className="flex flex-col flex-3 justify-left align-center bg-[var(--main-element)] w-[100vw] h-fit drop-shadow-md
                border border-[#293734] border-1 py-[5px]">
                    {/* rounded-lg  m-[1rem] */}
                <Link href="../">
                    <Image
                                className="rounded-full box-shadow-xl w-[3rem] 
                                h-auto drop-shadow-xl flex-1 mx-[1rem] my-[3px] p-1"
                                // border-[var(--end-focus-gradient)]  border-1 bg-[var(--background)]
                                src={"/Icons/tree-silhouette.png"}
                                alt={"A small tree icon that can be clicked to redirect to the main page"}
                                width={55}
                                height={55}
                                priority
                                />
                                
                </Link>
                {/* <div> Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik"> Freepik </a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com'</a></div> */}
                {/* <h1 className="float-left">EcoSearch</h1> */}
                <LogInButton/>

            </div>
        </>
    );
}