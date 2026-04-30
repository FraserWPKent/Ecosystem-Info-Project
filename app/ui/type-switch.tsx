export default function TypeSwitch(){
    return (
        <>
            <label className="inline-flex items-center cursor-pointer md:w-[25vw] lg:w-fit">
                <span className="select-none text-sm font-small text-heading w-fit">Ecosystems</span>
                <input type="checkbox" value="" className="sr-only peer"></input>
                <div className="relative mx-3 w-9 h-5 bg-neutral-quaternary peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-soft dark:peer-focus:ring-brand-soft rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-buffer after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand border border-1 p-1 rounded-2xl"></div>
                <span className="select-none text-sm font-small text-heading w-fit">Species</span>
            </label>
        </>
    );
}