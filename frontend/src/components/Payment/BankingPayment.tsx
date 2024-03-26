import React, { useEffect, useState } from 'react'
import { useUser } from '../../lib/context/UserContext'
import { Link } from 'react-router-dom'
import { IoIosAddCircle } from 'react-icons/io'
import { Tooltip } from '@mui/material'

type PaymentMethod = {id: string, type: string, info: string}

const BankingPayment = ({checkoutMobileBanking} : { checkoutMobileBanking: () => void }) => {

  const [options, setOptions] = useState<PaymentMethod[]>([])
  const [currentOption, setCurrentOptions] = useState<string>("")

  const {currentUser, isLoading} = useUser()


  async function initBankPaymentOptions() {
    if (!currentUser) return

    try {
      const result = await fetch(
        process.env.REACT_APP_BACKEND_URL + `/users/${currentUser.id}/paymentMethods`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (result.ok) {
        const data: PaymentMethod[]  = await result.json()
        setOptions(data.filter((method) => method.type === "Bank"))
      }
    } catch (err) {
      return
    }
  }


  useEffect(() => {
    initBankPaymentOptions()
  }, [isLoading])

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-3">
        <select className="select select-bordered w-48" value={currentOption} onChange={(e) => {setCurrentOptions(e.target.value)}}>
          <option value="">Select bank account</option>
          {
            options.map((option) => {
              return (
                <option value={option.id}>
                  {option.info.split("-")[0] + " - " + "XXXXX" + option.info.split("-")[1].substring(5,9) + "X"}
                </option>
              )
            })
          }
        </select>
        <Tooltip title="Add New Bank Account">
          <Link to="/settings/payment_information" className="hover:bg-indigo-100 rounded-full transition-colors">
            <IoIosAddCircle className="w-10 h-10 rounded-full"/>
          </Link>
        </Tooltip>
        
      </div>
      {
        (currentOption !== "") ? (
          <button className="primary-button" onClick={checkoutMobileBanking}>
                Checkout
          </button>
        ) : (
          <button className="disabled-button" disabled>
                Checkout
          </button>
        )
      }
    </div>
  )
}

export default BankingPayment