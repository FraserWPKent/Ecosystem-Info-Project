'use client';

export default function LogInButton(){
    function handleClick(){
        alert("Hello World");
    }
    return (
        <>
            <button className="rounded-2xl bg-[#007097] w-[5rem] h-[2rem] gap-[1rem] border-1 border-gray-800" onClick={handleClick}> Log In </button>
        </>
    );
}