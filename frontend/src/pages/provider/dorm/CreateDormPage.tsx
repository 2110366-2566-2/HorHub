import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import TextInput from '../../../components/Form/TextInput';
import TextAreaInput from '../../../components/Form/TextAreaInput';
import { useUser } from '../../../lib/context/UserContext';
import LoadingPage from '../../etc/LoadingPage';
import NumberInput from '../../../components/Form/NumberInput';
import ImagesInput from '../../../components/Form/ImagesInput';
import CheckboxesInput from '../../../components/Form/CheckboxesInput';
import { availableDormFacilities } from '../../../lib/constants/dormFacilities';
import { uploadImages } from '../../../lib/firebase';
import { ImageType } from 'react-images-uploading';
import { Bounce, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import NotFoundPage from '../../etc/NotFoundPage';
import DormMap from '../../../components/Dorm/DormMap';

const schema = z.object({
    name: z.string().trim().min(1, {message: "Fill dorm name"}).max(100, {message: "Your dorm name must not exceed 100 characters"}),
    description: z.string().trim().min(1, {message: "Fill description"}).max(5000, {message: "Description must not exceed 5000 characters"}),
    contractNumber: z.string().trim().refine((value) => /^[0-9]{9,10}$/.test(value), {message: 'Please fill valid number'}),
    address: z.string().trim().min(1, {message: "Fill dorm address"}).max(300, {message: "Address must not exceed 300 characters"}),
    latitude: z.coerce.number().min(-90.00000, {message: "The value must be between -90.00000 to 90.00000"}).max(90.00000, {message: "The value must be between -90.00000 to 90.00000"}),
    longitude: z.coerce.number().min(-180.00000, {message: "The value must be between -180.00000 to 180.00000"}).max(180.00000, {message: "The value must be between -180.00000 to 180.00000"}),
    dormFacilities: z.string().array()
})

type ValidationSchemaType = z.infer<typeof schema>;

const CreateDormPage = () => {
    const navigate = useNavigate()

    const {currentUser, isLoading, fetchUser} = useUser()

    const [dormImages, setDormImages] = useState<ImageType[]>([])

    const [allowSubmit, setAllowSubmit] = useState<boolean>(true)
    
    const { register, handleSubmit, watch, formState: { errors } } = useForm<ValidationSchemaType>({
        resolver: zodResolver(schema),
        mode: 'all',
        defaultValues: {
            dormFacilities: [],
        }
    });

    const watchLatitude = watch("latitude")
    const watchLongitude = watch("longitude")

    
    const onSubmit: SubmitHandler<ValidationSchemaType> = async (data) => {
        setAllowSubmit(false)

        await fetchUser();
        if (!currentUser){
            return;
        }

        const imagesURL = await uploadImages(dormImages, 'dorms/images')
        console.log(imagesURL)
        const result = await fetch(process.env.REACT_APP_BACKEND_URL + "/dorms",{
            method : "POST",
            credentials : 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body : JSON.stringify({...data, images: imagesURL})
        })

        if (result.ok) {
            // Done

            toast.success('Creating dorm successfully!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            const data = await result.json()
            setTimeout(() => {
                navigate('/provider/dorms/' + data.id)
            }, 1000)
        }
        else {
            setAllowSubmit(true)
        }

        
    }

    useEffect(() => {
        document.title = "Creating Dorm | HorHub";
    }, []);



    if (isLoading) {
        return <LoadingPage />
    }

    if (!currentUser) {
        return <NotFoundPage />
    }

    if (currentUser && currentUser.role === "Customer") {
        return <NotFoundPage />
    }


    return (
    <div className="page">
        <div className="w-full flex flex-col">
        <div className="border-b border-slate-300 my-2 font-bold text-left pt-2">Creating Dorm</div>
        <div className="text-sm w-full text-left">Please fill the following information to create dorm in the platform</div>
        <form className="flex flex-col " onSubmit = {handleSubmit(onSubmit)} >
            <TextInput 
                type="text" 
                name="name" 
                fieldName="Dorm Name" 
                placeholder="Name..." 
                register={register} 
                error={errors.name} 
            />

            <TextAreaInput 
                name="description" 
                fieldName="Description" 
                placeholder="Fill your dorm description here" 
                register={register} 
                error={errors.description} 
            />

            <TextInput 
                type="text" 
                name="contractNumber" 
                fieldName="Contract Number" 
                placeholder="XXXXXXXXXX" 
                register={register} 
                error={errors.contractNumber} 
            />

            <ImagesInput 
                fieldName="Dorm Images"
                maxNumber={10}
                images={dormImages}
                setImages={setDormImages}
            />

            <div className="border-b border-slate-300 my-2 font-bold text-left pt-2">Location</div>

            <div className="flex flex-col md:flex-row w-full">
                <div className="flex flex-col w-full md:w-1/2">
                    <TextInput 
                        type="text" 
                        name="address" 
                        fieldName="Address" 
                        placeholder="Address..." 
                        register={register} 
                        error={errors.address} 
                    />

                    <div className="flex gap-3">
                        <div className="w-40">
                            <NumberInput 
                                name="latitude" 
                                fieldName="Latitude" 
                                placeholder="0.00000" 
                                step={0.00001}
                                register={register} 
                                error={errors.latitude} 
                            />
                        </div>
                        <div className="w-40">
                            <NumberInput
                                name="longitude" 
                                fieldName="Longitude" 
                                placeholder="0.00000" 
                                step={0.00001}
                                register={register} 
                                error={errors.longitude} 
                            />
                        </div>
                    </div>
                    <div className="text-sm w-full text-left">In case you are not familiar with geolocation, please see <a href="https://support.google.com/maps/answer/18539" target="_blank">this guide</a></div>
                </div>
                <div className="flex flex-col w-full md:w-1/2 items-center">
                    <div className="w-4/5">
                        <DormMap lat={!watchLatitude ? 0 : Number(watchLatitude)} lng={!watchLongitude ? 0 : Number(watchLongitude)} />
                    </div>
                </div>
            </div>
            


            <div className="border-b border-slate-300 my-2 font-bold text-left pt-2">Facilities</div>
            
            
            <CheckboxesInput fieldName='Please select all facilities in your dorm' name='dormFacilities' choices={availableDormFacilities} register={register} />


            <div className="w-full flex justify-start pt-5">
                {
                    allowSubmit ? <button id="create_dorm_submit" type="submit" className="primary-button" >Create Dorm</button>
                    : <button className="disabled-button" disabled >Create Dorm</button>
                    
                }
              
            </div>
        </form>
        </div>
        
    </div>
    )
}

export default CreateDormPage