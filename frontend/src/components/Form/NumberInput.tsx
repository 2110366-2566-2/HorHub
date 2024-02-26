import React from 'react'
import { FieldError } from 'react-hook-form';

type FormFieldProps = {
    fieldName: string;
    placeholder: string;
    name: string;
    step?: number;
    register: any;
    error: FieldError | undefined;
  };

const NumberInput = ({fieldName, placeholder, name, step=1, register, error}: FormFieldProps) => {
  return (
    <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text font-semibold">{fieldName}</span>
            </div>
            <input 
                type="number"
                placeholder={placeholder}
                step={step}
                className={"input input-bordered input-sm w-full max-w-xs bg-white " + (error && "border-red-700")}
                {...register(name)}/>
            <div className="label">
            {
                error && (<span className="label-text-alt text-red-700">{error.message}</span>)
            }
            </div>
            
        </label>
  )
}

export default NumberInput