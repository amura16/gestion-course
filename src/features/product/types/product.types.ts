export type ProductStatus = "IN_STOCK" | "SHIPPED" | "DELIVERED";

export type Product = {
    id: number;
    name: string;
    volume: number;
    origin: string;
    createdAt: string;
    updatedAt: string;
    status: ProductStatus;
};

export interface CreateProductData {
    description: string;
    poids: number;
    longueur: number;
    largeur: number;
    hauteur: number;
    origine: string;
    status: ProductStatus;
}

export interface ProductListProps {
    products: Product[];
    onEdit: (product: Product) => void;
    onDelete: (id: number) => void;
};

export interface ProductFormProps {
    onSubmit: (data: CreateProductData) => void;
    onCancel: () => void;
    initialData?: CreateProductData;
    isSubmitting?: boolean;
};

export interface ProductCardProps {
    inStock: number;
    shipped: number;
    delivered: number;
};