import React from 'react'
import ProviderPaymentMethod from './PaymentMethod/ProviderPaymentMethod'
import CustomerPaymentMethod from './PaymentMethod/CustomerPaymentMethod'
import { useUser } from '../../../lib/context/UserContext'

const PaymentMethodPanel = () => {
  const {currentUser, isLoading} = useUser()
  return (
    <div className="flex flex-col w-full">
        <div className="border-b border-slate-300 my-2 font-bold text-left">Payment Method</div>
        {
          currentUser && currentUser.role === "Provider" && <ProviderPaymentMethod />
        }
        {
          currentUser && currentUser.role === "Customer" && <CustomerPaymentMethod />
        }
    </div>
  )
}

export default PaymentMethodPanel