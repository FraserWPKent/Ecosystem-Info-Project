import LoginBox from "../ui/login/login_box";
import Header from "../ui/shared/header";
import Footer from "../ui/shared/footer";
export default function Page(){
    return(
        <>
            <div className="min-h-screen flex flex-col">
                <main className="flex flex-col flex-1 items-center justify-center">
                    <Header/>
                    <LoginBox message={"Login"}/>
                    <Footer/>
               </main>
            </div>
        </>
    );
}