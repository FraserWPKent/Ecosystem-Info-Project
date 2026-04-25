'use client';
import Form from "next/form";
export default function InputField(){
    function inputHandler(val: FormData){
        alert(val.get("message"));
    }
    return(
        <>
            <Form action={inputHandler}>
                <input name = "message" className="block w-75vw md:w-96 lg:w-300 rounded-xl border border-gray-200 py-[7px] justify:center text-lg outline-2 placeholder:text-gray-500 text-center bg-white text-black"
                placeholder="Please Input The Address You Want To get Info About">
                {/* Message */}
                </input>
            </Form>
        </>
    );
}