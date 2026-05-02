import LoginBox from "../ui/login/login_box";
import Header from "../ui/shared/header";
export default function Page(){
    return(
        <>
            <div>
                <main className="flex flex-col flex-1 content-center text-center items-center justify-center">
                    <Header/>
                    <LoginBox message={"Login"}/>
               </main>
            </div>
        </>
    );
}