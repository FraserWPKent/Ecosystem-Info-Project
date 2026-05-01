import Image from "next/image";
import Link from "next/link";
import LogInButton from "../homepage/login-button";
export default function HeaderIcon(){
    return(
        <>
            <div className="flex flex-row flex-[90%_10%] justify-center content-center w-[100vw] drop-shadow-xl border border-black border-1">
                <Link href="../">
                    <Image
                                className="rounded-md w-[3rem] h-[3rem] float-left mr-4 mb-4 h-auto"
                                src={"/Icons/tree-silhouette.png"}
                                alt={"A small tree icon that can be clicked to redirect to the main page"}
                                width={1}
                                height={1}
                                priority
                                />
                </Link>
                <LogInButton/>

            </div>
        </>
    );
}