import HeaderIcon from "../ui/shared/header_icon";
import SignupBox from "../ui/signup/signup_box";
export default function Page(){
    return(
            <>
                <div>
                    <main className="flex flex-col flex-1 content-center text-center items-center justify-center">
                        <HeaderIcon/>
                        <SignupBox message={"Create Account"}/>
                   </main>
                </div>
            </>
        );
}