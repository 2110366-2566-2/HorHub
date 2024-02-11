export default function LabelProfile({header, children ,deactiveHover } : {header : string, children : React.ReactNode , deactiveHover? : boolean}){
    return (<div className= {((deactiveHover)? "" : "hover:bg-sky-300 ") +"transition-colors w-full flex justify-center py-1"}>
                <div className="w-3/4 flex gap-2 flex-wrap">
                    {header} : {children}
                </div>
            </div>);

}