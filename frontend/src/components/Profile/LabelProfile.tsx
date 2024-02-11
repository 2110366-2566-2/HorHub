export default function LabelProfile({header, children} : {header : string, children : React.ReactNode}){
    return (<div className="hover:bg-sky-300 transition-colors w-full flex justify-center">
                <div className="w-3/4">
                    {header} : {children}
                </div>
            </div>);

}