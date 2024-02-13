import React from 'react'
import SelectionInput from './SelectionInput'
import { FieldError } from 'react-hook-form';

type FormFieldProps = {
    fieldName: string;
    placeholder: string;
    name: string;
    register: any;
    error: FieldError | undefined;
  };

const options = [
    {
        value: "KBANK",
        children: <div className="flex items-center">
            KBANK
        </div>
    },
    {
        value: "SCB",
        children: <div className="flex items-center">
            SCB
        </div>
    }
]

const BankAccountInput = ({fieldName, placeholder, name, register, error}: FormFieldProps) => {
  return (
    <div className="w-40">
      <SelectionInput fieldName={fieldName} placeholder={placeholder} name={name} options={options} register={register} error={error} />
    </div>
    
  )
}

export default BankAccountInput