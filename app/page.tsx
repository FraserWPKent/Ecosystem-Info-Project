import Image from "next/image";
import InputField from "@/app/ui/homepage/input-field";
import LogInButton from "@/app/ui/shared/login-button";
import ToggleButton from "./ui/homepage/toggle-button";
import Header from "./ui/shared/header";
export default function Home() {
  return (
    <div className="animate-[appear_1s_ease-in-out]">
      <main className="flex flex-1 w-full flex-col items-center justify-between px-10 bg-[#2B2A33] sm:items-center">
        <meta title="Test"></meta>
        <Header/>
        <InputField/>
        
      </main>
    </div>
    // <div className="animate-[appear_1s_ease-in-out]">
    //   {/* bg-[#2B2A33] */}
    //   <main className="flex flex-1 w-[100vw] flex-col items-center justify-between px-10 bg-url(/public/dashboard_splash) sm:items-center">
    //     <meta title="Test"></meta>
    //     <Header/>
    //     <InputField/>
    //   </main>
    // </div>
  );
}
