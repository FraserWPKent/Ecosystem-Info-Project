import Image from "next/image";
import InputField from "@/app/ui/homepage/input-field";
import LogInButton from "@/app/ui/shared/login-button";
import ToggleButton from "./ui/homepage/toggle-button";
import Header from "./ui/shared/header";
export default function Home() {
  return (
    <div>
      <main className="flex flex-1 w-full flex-col items-center justify-between px-10 sm:items-center">
        <meta title="Test"></meta>
        <Header/>
        <Image
          className="my-[2rem] w-[65px] h-[65px] border border-[var(--start-focus-gradient)] rounded-full bg-linear-to-b from-[#2b3933] to-[var(--background)] p-2 drop-shadow-xl"
          src="/Dashboard/leaf.png"
          alt = "Small icon of a green leaf with a blacking green background"
          width={50}
          height={50}
          priority
        />
          
        
        <h1 className={`md: hidden lg:block text-6xl text-white font-semibold leading-10 tracking-tight justify-center items-center`}>
          <p className="float-left text-[var(--end-focus-gradient)] pr-4">Ecosystem</p> <p className="float-left pr-4">Informative </p> <p className="float-left">Search</p>
        </h1>
        <h1 className={`md:block lg:hidden text-6xl text-white font-semibold leading-10 tracking-tight justify-center items-center`}>
          <p className="float-left text-[var(--end-focus-gradient)] pr-2">Eco</p> Info
        </h1>
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
