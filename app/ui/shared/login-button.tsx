'use client';
import Link from "next/link";
export default function LogInButton(){
    return (
        <>
            <Link className="absolute right-5 rounded-xl bg-[#118dba] w-[5rem] h-[2rem] py-1 my-2 border-1 border-gray-800 drop-shadow-xl text-align-center text-center
                active:bg-red" 
            href="/login"> Log In </Link>
        </>
    );
}