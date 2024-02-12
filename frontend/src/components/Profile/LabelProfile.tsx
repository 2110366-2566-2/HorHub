export default function LabelProfile({header, children ,deactiveHover } : {header : string, children : React.ReactNode , deactiveHover? : boolean}){
    return (<div className= {((deactiveHover)? "" : "hover:bg-sky-300 ") +"transition-colors flex py-1"}>
                <div className="flex gap-2 flex-wrap items-start text-start text-sm">
                    <span className="font-semibold">{header} :</span> {children}
                </div>
            </div>);

}