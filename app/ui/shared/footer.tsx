
export default function Footer(){
    // I need to include this at the bottom of my pages to attribute the icon creator
    
    return(
        <>
            <div className="flex flex-col">
                <div className="flex flex-col flex-3 justify-left align-center bg-[var(--main-element)] w-[100vw] h-fit drop-shadow-md
                    border border-[#293734] border-1 py-[5px] ">
                    <a className="text-white px-2 py-1 hover:text-blue-500" href="https://www.flaticon.com/free-icons/tree" title="tree icons">Tree icons created by Freepik - Flaticon</a>
                    <p className = "break-normal text-white w-[100%} text-left pb-1 px-2">
                        All ecosystem information has been provided by NatureServe
                    </p>
                    <p className = "break-normal text-white text-left px-2">
                        NatureServe. 2026. NatureServe Explorer [web application]. NatureServe, Arlington, Virginia. Available https://explorer.natureserve.org/pro/. (Accessed: March 3rd, 2026).
                    </p>
                </div>
            </div>
        </>
    );
}