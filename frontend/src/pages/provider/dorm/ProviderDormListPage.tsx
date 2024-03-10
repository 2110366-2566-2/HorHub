import React, { useEffect, useState } from 'react'
import { useUser } from '../../../lib/context/UserContext'
import { Dorm } from '../../../lib/type/Dorm'

const ProviderDormListPage = () => {

    const {currentUser, isLoading} = useUser()

    const [isFetching, setFetching] = useState<boolean>(true)
    const [isFetchFailed, setFetchFailed] = useState<boolean>(false)

    const [dormsData, setDormsData] = useState<Dorm[]>([])


    async function getProviderDorm() {
        try {
            setFetching(true)

            const res = await fetch(process.env.REACT_APP_BACKEND_URL + "/users/" + currentUser?.id + "/dorms", {
                method: "GET",
                credentials: "include"
            })

            if (!res.ok) {
                setFetchFailed(true)
                setFetching(false)
                return
            }

            const data = await res.json()
            setDormsData(data)
            console.log(data)
            setFetching(false)

        }
        catch (err) {
            setFetchFailed(true)
            setFetching(false)
        }
    }

    useEffect(() => {
        getProviderDorm()
    }, [])


    return (
        <div className="w-full flex flex-col gap-5">
            <div className="border-b border-slate-300 my-2 font-bold text-left">My Dorms</div>
            <div className="text-sm w-full text-left">There are currently {dormsData.length} dorms that you have owned.</div>
            {
                dormsData.sort((a: Dorm, b: Dorm) => {
                    if (a.name < b.name) {
                        return -1;
                    }
                    if (a.name > b.name) {
                        return 1;
                    }
                    return 0;
                }).map((data) => {
                    return (
                        <div className="text-sm w-full text-left">{data.name}</div>
                    )
                })
            }
        </div>
    )
}

export default ProviderDormListPage