import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom';
import LoadingPage from '../../etc/LoadingPage';
import NotFoundPage from '../../etc/NotFoundPage';

type Transaction = {
  id: string;
  bookAt: Date;
  customer : {
    email : string;
    firstName : string;
    lastName : string;
  };
  roomTypeId: string;
  roomType: {
    name: string;
    dormId: string;
    capacity : number;
    dorm: {
      name: string;
      images : string[];
    };
  };
  transactionId : string;
  transaction : {
    createAt : Date;
    description : string;
    price : number;
  };
  startAt: Date;
  endAt: Date;
  price: number;
  status: string;
};

const ReceiptPage = () => {

  const {bookingId} = useParams();
  const [bookData,setBookData] = useState<Transaction | null>(null);

  const [isLoading,setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const initData = async() => {
        const res = await fetch(process.env.REACT_APP_BACKEND_URL + `/payment/receipt/${bookingId}`, {
                  method: "GET",
                  credentials: "include"
        });
        if (res.ok){
          const tmp = await res.json();
          setBookData(tmp);
        }
        
        setLoading(false);
    };
    
    initData();
  },[])
 
  if (isLoading) return <LoadingPage />
  if (!bookData) return <NotFoundPage />
  console.log(bookData);

  return (
    <div className='page gap-y-4 '>
        <div className='flex w-full text-2xl'>
          <div className='w-full text-indigo-700 font-bold'>HorHub</div>
          <div className='w-full text-end font-bold'>Receipt</div>
        </div>
        <div className='grid grid-cols-4 w-full grid-rows-6 items-center gap-2 grid-flow-row break-words '>
          <div className='col-span-2 row-span-2 bg-indigo-200 p-2 h-full'>
            <div className='font-bold'>Email</div>
            <div className='text-indigo-700'>{bookData.customer.email}</div>
          </div>
          <div className='col-span-2 row-span-3 bg-indigo-200 p-2 h-full'>
            <div className='font-bold'>Horhub</div>
            <div className='text-indigo-700'>
              <div>HorHub Co.Ltd., Phayathai Road,</div>
              <div>Pathumwan, Bangkok 10330</div>
              <div>horhub48@gmail.com</div>
            </div>
          </div>
          <div className='col-span-2 row-span-2 bg-indigo-200 p-2 h-full'>
            <div className='font-bold'>INVOICE DATE</div>
            <div className='text-indigo-700'>{new Date(bookData.transaction.createAt).toDateString()}</div>
          </div>
          <div className='col-span-2 row-span-3 bg-indigo-200 p-2 h-full'>
            <div className='font-bold'>BILLED TO</div>
            <div className='text-indigo-700'>{bookData.customer.firstName + " " + bookData.customer.lastName}</div>
          </div>
          <div className='col-span-1 row-span-2 bg-indigo-200 p-2 h-full'>
            <div className='font-bold'>TRANSACTION ID</div>
            <div className='text-indigo-700'>{bookData.transactionId}</div>
          </div>
          <div className='col-span-1 row-span-2 bg-indigo-200 p-2 h-full'>
            <div className='font-bold'>INVOICE ID</div>
            <div className='text-indigo-700  '>{bookData.id}</div>
          </div>
        </div>
        <div className='bg-indigo-200 w-full p-2 font-bold'>
          Dormitory Reservation
        </div>
        <div className='flex w-full gap-x-4'>
          <div className="aspect-[672/494] rounded-md overflow-hidden shadow-[0_2px_8px_rgba(15,23,42,0.08)] bg-slate-200 ">
            <img
            width="672"
            height="494"
            className='w-[200px] h-[200px] inset-0  object-cover' 
            src = {(bookData.roomType.dorm.images.length === 0) ? "https://firebasestorage.googleapis.com/v0/b/horhub-7d1df.appspot.com/o/placeholders%2F681px-Placeholder_view_vector.png?alt=media&token=bc0c7178-b94a-4bf0-957b-42a75f708a79" : bookData.roomType.dorm.images[0]}/>
          </div>
          <div className='mx-6 w-full'>
            <div className='w-full flex justify-between font-bold my-6'>
              <div>{bookData.roomType.dorm.name}</div>
              <div>฿ {bookData.transaction.price}</div>
            </div>
            <div>{bookData.roomType.name}</div>
            <div>Capacity : {bookData.roomType.capacity}</div>
            <div className='text-indigo-500'>{new Date(bookData.startAt).toDateString()} - {new Date(bookData.endAt).toDateString()}</div>
          </div>
        </div>
        <div className='w-full font-bold flex gap-2'>
          <div className='bg-indigo-200 w-3/4 p-2 text-end'>Total (Including VAT 7%)</div>
          <div className='bg-indigo-200 w-1/4 p-2'>฿ {bookData.transaction.price}</div>
        </div>
        <div>Need help? Visit <span className='font-bold'>horhub.com/support</span></div>
        <div>Or scan</div>
        <div>Img here</div>
        <div className='flex justify-between w-full'>
          <div>
            <div>Facebook Page : horhub</div>
            <div>IG : @horhub48</div>
            <div>Line : @hh.horhub</div>
            <div>Tel : +66 66 666 66666</div>
          </div>
          <div>
            <div className='font-bold text-indigo-600'>HorHub</div>
            <div>Copyright 2024 HorHub.Co.Ltd</div>
          </div>
        </div>
        <div className='w-full flex justify-end gap-2'>
          <button className='primary-button'>Print PDF</button>
          <button className='primary-button'>Print JPG</button>
        </div>
    </div>
  )
}

export default ReceiptPage


