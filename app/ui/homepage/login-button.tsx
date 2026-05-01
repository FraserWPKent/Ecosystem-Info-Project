'use client';
import Link from "next/link";
export default function LogInButton(){
    return (
        <>
            <Link className="rounded-xl bg-[#118dba] w-[5rem] h-[2rem] px-4 py-1 border-1 border-gray-800 drop-shadow-xl" 
            href="/login"> Log In </Link>
        </>
    );
}