'use client';

export default function LogInButton(){
    function handleClick(){
        alert("Hello World");
    }
    return (
        <>
            <button className="rounded-3xl bg-white gap-[1rem]" onClick={handleClick}> Log In </button>
        </>
    );
}