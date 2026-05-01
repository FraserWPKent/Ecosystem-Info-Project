import LoginBox from "../ui/login/login_box";
export default function Page(){
    return(
        <>
            <div>
                <main className="flex flex-1 items-center text-center justify-center">
                    <LoginBox message={"login"}/>
               </main>
            </div>
        </>
    );
}