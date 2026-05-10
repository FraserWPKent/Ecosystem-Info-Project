import Header from "../ui/shared/header";
import SignupBox from "../ui/signup/signup_box";
export default function Page(){
    return(
            <>
                <div>
                    <main className="flex flex-col flex-1 content-center items-center justify-center">
                        <Header/>
                        <SignupBox message={"Create Account"}/>
                   </main>
                </div>
            </>
        );
}