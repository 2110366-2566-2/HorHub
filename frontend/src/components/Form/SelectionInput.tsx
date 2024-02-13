import React from 'react'
import { FieldError } from 'react-hook-form';

type FormFieldProps = {
    fieldName: string;
    placeholder: string;
    name: string;
    options: {
        value: string,
        children: any
    }[]
    register: any;
    error: FieldError | undefined;
  };

const SelectionInput = ({fieldName, placeholder, name, options, register, error}: FormFieldProps) => {
  return (
    <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text font-semibold">{fieldName}</span>
            </div>
            <select 
                className={"input input-bordered input-sm w-full max-w-xs bg-white " + (error && "border-red-700")}
                {...register(name)} >
                <option value="">{placeholder}</option>
                {
                  options.map((data, idx) => {
                    return (
                      <option key={data.value} value={data.value}>{data.children}</option>
                    )
                  })
                }

            </select>

            <div className="label">
            {
                error && (<span className="label-text-alt text-red-700">{error.message}</span>)
            }
            </div>
            
        </label>
  )
}

export default SelectionInput