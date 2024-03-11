import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { z } from 'zod';
import { useUser } from '../../lib/context/UserContext';
import LoadingPage from '../etc/LoadingPage';
import { RoomType } from '../../lib/type/Dorm';
import NotFoundPage from '../etc/NotFoundPage';
import TextInput from '../../components/Form/TextInput';

const schema = z.object({
    startAt: z.coerce.date().refine((data) => data > new Date(), { message: "This should not be before tomorrow" }),
    endAt: z.coerce.date()
}).refine((data) => data.startAt <= data.endAt, {
    path: ['endAt'],
    message: 'This should be after or at starting date'
  })

type ValidationSchemaType = z.infer<typeof schema>;

const BookingPage = () => {
    const { dormId, roomtypeId } = useParams();

    const {currentUser, isLoading} = useUser()


    const [allowSubmit, setAllowSubmit] = useState<boolean>(true)
    const [isFetching, setFetching] = useState<boolean>(true)
    const [isInvalid, setInvalid] = useState<boolean>(false)

    const [roomData, setRoomData] = useState<RoomType>()


    const { register, handleSubmit, formState: { errors }, getValues } = useForm<ValidationSchemaType>({
        resolver: zodResolver(schema),
        mode: 'all',
    });

    const onSubmit: SubmitHandler<ValidationSchemaType> = async (data) => {


    }

    

    async function initData() {
        setFetching(true)

        try {
            const res = await fetch(process.env.REACT_APP_BACKEND_URL + "/dorms/" + dormId + "/roomtypes/" + roomtypeId, {
                method: "GET",
                credentials: "include"
            })

            if (!res.ok) {
                setInvalid(true)
                setFetching(false)
                return
            }

            // Successs fetching
            const data = await res.json()
            setRoomData(data)


            setFetching(false)

        }
        catch (err) {
            setInvalid(true)
            setFetching(false)
        }
    }

    useEffect(() => {
        initData()
    }, [])

    if (isLoading || isFetching) {
        return <LoadingPage />
    }

    if (!roomData || isInvalid || !currentUser || currentUser.role != "Customer") {
        return <NotFoundPage />
    }




  return (
    <div className="page">
        <div className="w-full flex flex-col">
            <div className="border-b border-slate-300 my-2 font-bold text-left pt-2">Reserving Room</div>
            <div className="w-full flex flex-col md:flex-row">
                <div className="w-full md:w-[60%] flex flex-col">
                    <div className="text-sm w-full text-left">Please fill the following information to reserve this room</div>
                    <form className="flex flex-col " onSubmit = {handleSubmit(onSubmit)} >
                    <TextInput
                        type="date" 
                        name="startAt" 
                        fieldName="Date that you will start living" 
                        placeholder="" 
                        register={register} 
                        error={errors.startAt} 
                    />
                    <TextInput
                        type="date" 
                        name="endAt" 
                        fieldName="Date that you will finish living here" 
                        placeholder="" 
                        register={register} 
                        error={errors.endAt} 
                    />
                    </form>
                </div>
                <div className="w-full md:w-[40%] flex flex-col p-5 text-sm items-center">
                    <div className="card w-full max-w-96 bg-base-200 shadow-lg border border-slate-300">
                        <div className="card-body">
                            <h2 className="card-title text-base">{roomData.name}</h2>
                            <p>{roomData.dorm.name}</p>
                            <table className="table table-sm">
                                <tbody>
                                    <tr>
                                        <td>Price per month (baht)</td>
                                        <td>{Number(roomData.cost).toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td>Duration (month)</td>
                                        {/* <td>{Number(getValues("endAt"). - getValues("startAt")).toFixed(2)}</td> */}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default BookingPage