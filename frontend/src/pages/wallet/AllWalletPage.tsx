import { useEffect, useState } from "react";
import useAuthRedirect from "../../lib/authRedirect";
import LoadingPage from "../etc/LoadingPage";
import NotFoundPage from "../etc/NotFoundPage";
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TransactionCard from "../../components/Transaction/TransactionCard";


type Transaction = {
    type : string;
    price : number;
    description : string;
    createAt : Date;  
};

export default function AllWalletPage(){
    const [transaction,setTransaction] = useState<null | Transaction[]>(null);
    const [isLoading,setLoading] = useState<boolean>(true);
    const [sortby,setSortby] = useState("DESCENDING");
    const [typeSort,setTypeSort] = useState("DATE");

    const handleChange = (event: SelectChangeEvent) => {
        setTypeSort(event.target.value as string);
        sorting(sortby,event.target.value);
      };

    const sorting = (sortby : string ,sortType : string) => {
        if(!transaction){
            return;
        }
        if (sortType === "DATE"){
            setTransaction(transaction.slice().sort((a,b) => {
            if (sortby === "DESCENDING")
                return new Date(b.createAt).getTime() - new Date(a.createAt).getTime();
             else 
                return new Date(a.createAt).getTime() - new Date(b.createAt).getTime();
            }
            ));
        }
        else if (sortType === "AMOUNT"){
            setTransaction(transaction.slice().sort((a,b) => {
                if (sortby === "DESCENDING")
                    return b.price - a.price;
                else
                    return a.price - b.price;
            }));
        }
        
    };
    const handleChange2 = (event: SelectChangeEvent) => {
        setSortby(event.target.value as string);
        sorting(event.target.value,typeSort);
      };
    useEffect(() => {
        window.document.title = "Transactions | HorHub"
        const initData = async() => {
            const data = await fetch(process.env.REACT_APP_BACKEND_URL + "/auth/wallet",{
                method : "GET",
                credentials : "include"
            });
            if (data.ok){
                const tmp = await data.json();
                console.log(tmp);
                setTransaction(tmp["transaction"]);
            }
            setLoading(false);
        };
        initData();
    },[]);
    useAuthRedirect();

    if (isLoading) return <LoadingPage />
    if (transaction === null) return <NotFoundPage />
    return (
    <div className="page gap-2">
        <div className="flex justify-between w-full">
            <div className="flex gap-2 w-full">
                <div className="h-16 w-24 rounded-md flex justify-end items-end bg-gradient-to-r from-sky-600 to-indigo-500 text-white p-2">HorHub</div>
                <Link to = {".."} relative="path" className="flex items-center ">back to wallet</Link>
            </div>
            <div className="w-full flex justify-center items-center font-bold">
                Transaction
            </div>
            <div className="w-full flex justify-end items-center gap-4">
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={sortby}
                        label="Sort by"
                        onChange={handleChange2}
                        >
                        <MenuItem value={"ASCENDING"}>ASCENDING</MenuItem>
                        <MenuItem value={"DESCENDING"}>DESCENDING</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Select Type</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={typeSort}
                        label="Select Type"
                        onChange={handleChange}
                        >
                        <MenuItem value={"DATE"}>DATE</MenuItem>
                        <MenuItem value={"AMOUNT"}>AMOUNT</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </div>
            
        </div>
        <div className="w-11/12 self-center bg-indigo-100 p-4 rounded-xl flex flex-col gap-4" >
            <div className="flex justify-between font-bold">
                <div className="flex w-10/12">
                    <div className="w-1/5">Date</div>
                    <div className="w-[70%]">Description</div>
                    <div className="w-[10%] text-right pr-6">Type</div>
                </div>
                <div className="w-2/12 text-end">
                    <div>Amount</div>
                </div>
            </div>
            {transaction.map((trans,idx) => {
            return <TransactionCard  date={trans.createAt} description={trans.description} amount={trans.price} type = {trans.type} fullmode = {true}/>})}
                            
        </div>
        
    </div>);
}