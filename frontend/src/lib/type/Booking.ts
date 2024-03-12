export type BookingType = {
    id: string,
    bookAt: Date,
    customerId: string,
    roomTypeId: string,
    roomType: {
      name: string,
      dormId: string,
      dorm: {
        name: string
      }
    }
    startAt: Date,
    endAt: Date,
    price: number,
    status: string
  }