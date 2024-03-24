export default function TransactionCard({date, description, amount , type, fullmode} : {date : Date, description : string, amount : number, type : string, fullmode : boolean}){
    return (
    <div className="bg-white rounded-lg p-4 flex w-full font-bold justify-between">
        <div className="flex w-10/12 gap-x-2">
            <div className="w-1/5">
                <div>{new Date(date).toDateString()}</div>
                <div className="font-normal">{new Date(date).toTimeString().split(" ")[0]}</div>
            </div >
            <div className="w-4/5">{description}</div>
        </div>
        <div className="w-2/12 text-end">
           {(type === "WalletDeposit") ? "+" : "-"} ฿ {amount}
        </div>
    </div>);
}