import React from 'react'
import { FieldError } from 'react-hook-form';
import CheckboxSubbox from './CheckboxSubbox';

type FormFieldProps = {
    fieldName: string;
    name: string;
    choices: {
      value: string;
      label: any;
    }[];
    register: any;
};

const CheckboxesInput = ({ fieldName, name, choices, register }: FormFieldProps) => {

  return (
    <div className="form-control w-full">
      <div className="label">
        <span className="label-text font-semibold">{fieldName}</span>
      </div>
      <div className="flex flex-col gap-3">
        {
          choices.map((data) => {
            return <CheckboxSubbox key={data.value} value={data.value} label={data.label} register={register} name={name} />
          })
        }
      </div>
    </div>
  )
}

export default CheckboxesInput