import { useEffect, useState } from "react";
import useAuthRedirect from "../../lib/authRedirect"
import LoadingPage from "../etc/LoadingPage";
import NotFoundPage from "../etc/NotFoundPage";
import { Link } from "react-router-dom";
import { LuBanknote } from "react-icons/lu";
import TransactionCard from "../../components/Transaction/TransactionCard";
type Transaction = {
    type : string;
    price : number;
    description : string;
    createAt : Date;  
};

export default function MyWallet(){
    const [isLoading,setLoading] = useState<boolean>(true);
    const [balance,setBalance] = useState<number>(0);
    const [name,setName] = useState<string>("");
    const [transaction,setTransaction] = useState<null | Transaction[]>(null);

    useEffect(() => {
        const initData = async() => {
            const data = await fetch(process.env.REACT_APP_BACKEND_URL + "/auth/wallet",{
                method : "GET",
                credentials : "include"
            });
            if (data.ok){
                const tmp = await data.json();
                console.log(tmp);
                setTransaction(tmp["transaction"]);
                setName(tmp["name"]);
                setBalance(tmp["balance"].toFixed(2));
            }
            setLoading(false);
        };
        initData();
    },[]);
    useAuthRedirect();

    if (isLoading) return <LoadingPage />
    if (transaction === null) return <NotFoundPage />

    return (<div className="page w-full">
                <div className="flex flex-col lg:flex-row w-full  justify-between">
                    <div className="w-full flex flex-col items-center gap-4">
                        <div className="font-bold">
                            {name + "'s Wallet"} 
                        </div>
                        <div className="w-3/4 h-[30vh] bg-gradient-to-r from-sky-600 to-indigo-500 rounded-3xl p-6 text-white self-center">
                            <div className="flex flex-col h-full justify-between">
                                <div className="justify-self-start">
                                    Current Balance
                                    <div className="font-bold text-2xl">฿ {balance}</div>
                                </div>
                                
                                <div className="self-end font-bold text-lg">Horhub</div>
                            </div>
                        </div>
                        <div>
                            <div className="text-indigo-800">Usable Balance</div>
                            <div className="font-bold text-lg">฿ {balance}</div>
                        </div>

                        <Link to = "./withdrawn" className="primary-button flex gap-2 items-center">
                            <LuBanknote />
                            <div>Withdrawn Money</div>
                            
                        </Link>
                    </div>
                    <div className="w-full flex flex-col gap-y-4">
                        <div className="font-bold">
                            Lastest Transactions
                        </div>
                        <div className="w-11/12 self-center bg-indigo-100 p-4 rounded-xl flex flex-col gap-4" >
                            <div className="flex justify-between font-bold">
                                <div>Date</div>
                                <div>Description</div>
                                <div>Amount</div>
                            </div>
                            {transaction.map((trans,idx) => {
                                if (idx < 5)
                                    return <TransactionCard  date={trans.createAt} description={trans.description} amount={trans.price} type = {trans.type} fullmode = {false}/>})}
                            <Link to = "all" className="text-center primary-button w-1/5 self-center" >View All</Link>
                        </div>
                    </div>
                </div>
            </div>)
}