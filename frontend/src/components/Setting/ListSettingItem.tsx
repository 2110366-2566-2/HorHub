export default function ListSettingItem({children , active} : {children? : React.ReactNode , active? : boolean}){
    return (
    // <li className = {"relative hover:bg-slate-100 p-2 flex gap-2 items-center text-black " + ((active) ? "bg-slate-400 font-bold" : "")}>
    <li className = {"relative hover:bg-slate-100 p-2 flex gap-2 items-center text-black"}>    
        {children}
        {
            active && <div className="absolute -left-1 h-full w-1 bg-indigo-500"></div>
        }
    </li>);
}