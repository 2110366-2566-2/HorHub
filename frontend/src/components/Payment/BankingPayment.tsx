import React, { useEffect, useState } from 'react'
import { useUser } from '../../lib/context/UserContext'

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
      <select className="select select-bordered w-48" value={currentOption} onChange={(e) => {setCurrentOptions(e.target.value)}}>
        <option value="">Select bank account</option>
        {
          options.map((option) => {
            return (
              <option value={option.id}>
                {option.info.split("-")[0] + " - " + option.info.split("-")[1].substring(0,3) + "*******"}
              </option>
            )
          })
        }
      </select>
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