import React, { useEffect, useState } from 'react'
import { useUser } from '../../../../lib/context/UserContext'

const CustomerPaymentMethod = () => {

    const {currentUser} = useUser()

    const [methodData, setMethodData] = useState<{id: String, type: string, info: string}[]>([])

    
    async function deleteMethod(methodId: string) {
        if (!currentUser) {
            return
        }
        const res = await fetch(process.env.REACT_APP_BACKEND_URL + "/users/" + currentUser.id + "/paymentMethods" + methodId, {
            method: "DELETE"
        })
        document.location = "/settings/payment_information"
    }

    useEffect(() => {
        if (!currentUser) {
            return
        }
        fetch(process.env.REACT_APP_BACKEND_URL + "/users/" + currentUser.id + "/paymentMethods", {
            method: "GET"
        }).then((res) => res.json())
        .then((data: {id: string, type: string, info: string}[]) => {setMethodData(data)})
    }, [currentUser])



  return (
    <div className="w-full flex-col space-y-8">
        <div className="w-full flex-col gap-3">
            <div className="text-base w-full font-bold text-left">Bank Accounts</div>
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
                                <tr className="hover:bg-slate-100 transition-colors">
                                    <th>{idx+1}</th>
                                    <td>{data.info.split('-')[0]}</td>
                                    <td>{data.info.split('-')[1]}</td>
                                    <td>Delete?</td>
                                </tr>
                            )
                        })
                    }
                    
                </tbody>
            </table>
        </div>

        <div className="w-full flex-col gap-3">
            <div className="text-base w-full font-bold text-left">Credit or Debit Cards</div>
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
                                    <td>Delete?</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>

    </div>
  )
}

export default CustomerPaymentMethod