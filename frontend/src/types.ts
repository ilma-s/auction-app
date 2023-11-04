export interface Product {
    productId: string;
    name: string;
    description: string;
    startingPrice: number;
    images: Image[];
    sellerId: Seller;
    startDate: Date;
    endDate: Date;
    status: string;
}

export interface Image {
    imageId: string;
    imageUrl: string;
}

export interface Seller {
    userId: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
}

export interface Category {
    categoryId: string;
    name: string;
};

export interface BidInformation {
    highestBid: number;
    numberOfBids: number;
    timeLeft: string;
};