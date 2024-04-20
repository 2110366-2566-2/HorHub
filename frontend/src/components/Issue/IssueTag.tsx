import React from 'react'

const IssueTag = ({ status }: { status: string }) => {
    if (status === "Waiting") {
        return (
            <div className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                Waiting
            </div>
        )
    }
    else if (status === "Rejected") {
        return (
            <div className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                Rejected
            </div>
        )
    }
    else if (status === "Resolved") {
        return (
            <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                Resolved
            </div>
        )
    }

    return (
        <div className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            Waiting
        </div>
    )
  
}

export default IssueTag