'use client';
import Link from "next/link";
import Image from "next/image";
export default function LogInButton(){
    return (
        // Icon attribution
        // <div> Icons made by <a href="https://www.magnific.com" title="Freepik"> Freepik </a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com'</a></div>
        <>
            <Link className="absolute right-5 rounded-xl bg-[var(--background)] w-[7rem] h-3/5 py-1 my-2 border-1 border-[var(--start-focus-gradient)] 
                drop-shadow-xl text-align-center text-center text-white content-center hover:opacity-70 drop-shadow-xl" href="/login"> 
                <Image
                    className="w-1/5 float-left ml-3"
                    src="/Icons/user.png"
                    alt="Small icon of a the silhouette of a person to represent a login button"
                    width={10}
                    height={10}
                    priority
                />
                Log In 
            </Link>
        </>
    );
}