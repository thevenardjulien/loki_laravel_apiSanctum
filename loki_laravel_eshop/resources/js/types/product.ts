export type products = product[];

export type product = {
    id: number;
    title: string;
    description: string;
    image: string;
    image_url?: string;
    category: string;
    price: number;
    stock: number;
    color: string;
    sizes: string;
};
