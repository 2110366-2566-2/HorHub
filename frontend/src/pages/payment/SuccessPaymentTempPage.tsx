import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import LoadingPage from '../etc/LoadingPage'
import NotFoundPage from '../etc/NotFoundPage'

const SuccessPaymentTempPage = () => {
    const { bookingId, checkoutToken } = useParams()

    const [isFetching, setFetching] = useState<boolean>(true)
    const [isInvalid, setInvalid] = useState<boolean>(false)

    const navigate = useNavigate()

    async function attempSuccessPayment() {
        setFetching(true)
        try {
            const result = await fetch(process.env.REACT_APP_BACKEND_URL + "/bookings/" + bookingId + "/confirmpayment/" + checkoutToken,{
                method : "POST",
                credentials : 'include',
            })

            if (result.ok) {
                const data = result.json()
                navigate('/bookings/' + bookingId + '/receipt')
            }
            else {
                setFetching(false)
                setInvalid(true)
            }

        } catch (err) {
            setFetching(false)
            setInvalid(true)
        }
    }


    useEffect(() => {
        attempSuccessPayment()
    }, [])


    if (isFetching) {
        return <LoadingPage />
    }

    if (isInvalid) {
        return <NotFoundPage />
    }

  return (
    <div>SuccessPaymentTempPage</div>
  )
}

export default SuccessPaymentTempPage