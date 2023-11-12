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
    categories: Category[];
}

export interface Category {
    categoryId: string;
    name: string;
    parentCategory?: Category;
    category?: Category;
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
