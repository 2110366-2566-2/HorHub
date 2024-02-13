import React from 'react'
import ProviderPaymentMethod from './PaymentMethod/ProviderPaymentMethod'
import CustomerPaymentMethod from './PaymentMethod/CustomerPaymentMethod'

const PaymentMethodPanel = () => {
  return (
    <div className="flex flex-col w-full">
        <div className="border-b border-slate-300 my-2 font-bold text-left">Payment Method</div>
        <ProviderPaymentMethod />
        <CustomerPaymentMethod />
    </div>
  )
}

export default PaymentMethodPanel