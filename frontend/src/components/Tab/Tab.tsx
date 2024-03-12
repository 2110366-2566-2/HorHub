import React from 'react'

type TabProps = {
    options: {
        name: string,
        onClick: () => void,
        isActive: boolean
    }[]
}

const Tab = ({ options }: TabProps) => {
  return (
    <div role="tablist" className="w-full tabs flex tabs-bordered border-b border-b-slate-200">
        {
            options.map((value, idx) => {
                return <a role="tab" key={idx} className={"px-4 py-1 text-sm text-black border-b hover:bg-slate-100 " + (value.isActive && "border-b-2 border-indigo-600")} onClick={value.onClick}>{value.name}</a>
            })
        }
    </div>
  )
}

export default Tab