import LoginBox from "../ui/login/login_box";
import HeaderIcon from "../ui/shared/header_icon";
export default function Page(){
    return(
        <>
            <div>
                <main className="flex flex-col flex-1 content-center text-center items-center justify-center">
                    <HeaderIcon/>
                    <LoginBox message={"Login"}/>
               </main>
            </div>
        </>
    );
}