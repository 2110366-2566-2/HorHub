import React, { useEffect, useState } from 'react'
import { useUser } from '../../../../lib/context/UserContext'
import DeletePaymentMethodModal from '../PaymentMethodModal/DeletePaymentMethodModal'
import AddPaymentMethodBankModal from '../PaymentMethodModal/AddPaymentMethodBankModal'
import AddPaymentMethodCardModal from '../PaymentMethodModal/AddPaymentMethodCardModal'

const CustomerPaymentMethod = () => {

    const {currentUser,fetchUser} = useUser()

    const [methodData, setMethodData] = useState<{id: string, type: string, info: string}[]>([])
    
    async function deleteMethod(methodId: string) {
        await fetchUser();
        if (!currentUser) {
            return;
        }
        
        const res = await fetch(process.env.REACT_APP_BACKEND_URL + "/users/" + currentUser.id + "/paymentMethods/" + methodId, {
            method: "DELETE",
            credentials: "include"
        });
        document.location = "/settings/payment_information";
        
    }

    async function addBankMethod(bankName: string, bankAccountNumber: string) {
        await fetchUser();
        if (!currentUser) {
            return false
        }
        const res = await fetch(process.env.REACT_APP_BACKEND_URL + "/users/" + currentUser.id + "/paymentMethods", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({type: "Bank", info: `${bankName}-${bankAccountNumber}`}),
        })

        if (res.ok) {
            document.location = "/settings/payment_information"
            return true
        }
        return false
    }

    async function addCardMethod(cardNumber: string) {
        await fetchUser();
        if (!currentUser) {
            return false
        }
        const res = await fetch(process.env.REACT_APP_BACKEND_URL + "/users/" + currentUser.id + "/paymentMethods", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({type: "Card", info: cardNumber}),
        })

        if (res.ok) {
            document.location = "/settings/payment_information"
            return true
        }
        return false
    }


    useEffect(() => {
        if (!currentUser) {
            return
        }
        fetch(process.env.REACT_APP_BACKEND_URL + "/users/" + currentUser.id + "/paymentMethods", {
            method: "GET"
        }).then((res) => res.json())
        .then((data: {id: string, type: string, info: string}[]) => {console.log(data); setMethodData(data)})
    }, [currentUser])



  return (
    <div className="w-full flex-col space-y-8">
        <div className="w-full flex-col gap-3">
            <div className="text-base w-full font-bold text-left pb-4 pt-4">Bank Accounts</div>
            <table className="table">
                <thead>
                    <tr>
                        <th className="w-[5%]"></th>
                        <th className="w-[15%]">Bank Name</th>
                        <th>Account Number</th>
                        <th className="w-[10%]"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        methodData.filter((value) => {return value.type === "Bank"}).map((data, idx) => {
                            return (
                                <tr key={data.id} className="hover:bg-slate-100 transition-colors">
                                    <th>{idx+1}</th>
                                    <td>{data.info.split('-')[0]}</td>
                                    <td>{data.info.split('-')[1]}</td>
                                    <td className="flex justify-end"><DeletePaymentMethodModal id={data.id} deleteFunction={() => deleteMethod(data.id)}/></td>
                                </tr>
                            )
                        })
                    }
                    
                </tbody>
            </table>
            <div className="w-full flex justify-center pt-4">
                <AddPaymentMethodBankModal addFunction={addBankMethod} />
            </div>
            
        </div>

        <div className="w-full flex-col gap-3">
            <div className="text-base w-full font-bold text-left pb-4 pt-4">Credit or Debit Cards</div>
            <table className="table">
                <thead>
                    <tr>
                        <th className="w-[5%]"></th>
                        <th>Card Number</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        methodData.filter((value) => {return value.type === "Card"}).map((data, idx) => {
                            return (
                                <tr className="hover:bg-slate-100 transition-colors">
                                    <th>{idx+1}</th>
                                    <td>{data.info}</td>
                                    <td className="flex justify-end"><DeletePaymentMethodModal id={data.id} deleteFunction={() => deleteMethod(data.id)}/></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <div className="w-full flex justify-center pt-4">
                <AddPaymentMethodCardModal addFunction={addCardMethod} />
            </div>
        </div>

    </div>
  )
}

export default CustomerPaymentMethod