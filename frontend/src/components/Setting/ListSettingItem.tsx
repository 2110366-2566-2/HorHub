export default function ListSettingItem({children , active} : {children? : React.ReactNode , active? : boolean}){
    return (
    <li className = {"hover:bg-slate-400 p-2 flex gap-2 items-center text-black " + ((active) ? "bg-slate-400 font-bold" : "")}>
        {children}
    </li>);
}