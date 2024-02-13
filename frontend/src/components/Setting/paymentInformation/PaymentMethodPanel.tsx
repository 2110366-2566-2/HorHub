import React from 'react'
import ProviderPaymentMethod from './PaymentMethod/ProviderPaymentMethod'

const PaymentMethodPanel = () => {
  return (
    <div className="flex flex-col w-full">
        <div className="border-b border-slate-300 my-2 font-bold text-left">Payment Method</div>
        <ProviderPaymentMethod />
    </div>
  )
}

export default PaymentMethodPanel