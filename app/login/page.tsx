import LoginBox from "../ui/login/login_box";
export default function Page(){
    return(
        <>
            <div>
               <main className="flex flex-1 w-full flex-col items-center justify-between px-10 bg-[#2B2A33] sm:items-center">
                    <LoginBox/>
               </main>
            </div>
        </>
    );
}