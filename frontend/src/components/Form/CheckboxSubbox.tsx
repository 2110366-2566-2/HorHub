import React from 'react'

const CheckboxSubbox = ({value, label, register, name}: {value: string, label: any, register: any, name: string}) => {
  return (
    <label className="w-60 border border-slate-300 px-3 py-2 rounded-md flex gap-2 hover:bg-indigo-50 transition-colors">
      <input id={`checkbox_${name}_${value}`} type="checkbox" className="" value={value} {...register(name)} />
      <div>
        {label}
      </div>
    </label>
  )
}

export default CheckboxSubbox