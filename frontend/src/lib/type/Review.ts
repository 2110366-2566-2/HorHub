export type Review = {
    id: string,
    customerId: string,
    customer?: {
        displayName: string,
        imageURL: string,
    }
    dormId: string,
    rating: number,
    description: string,
    images: string[],
    reviewAt: Date,
}