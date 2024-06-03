export interface product extends collection {
    name: string;
    price: number;
    description?: string;
    image?: string;
}

export interface user extends collection {
    name: string;
    surname: string;
    email: string;
    password: string;
}

export interface cartItem extends collection {
    userId: string;
    productId: string;
    name: string;
    price: number;
    description?: string;
    image?: string;
}

export interface collection {
    _id?: string;
}