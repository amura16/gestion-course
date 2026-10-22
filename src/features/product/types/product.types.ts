export type ProductStatus = "IN_STOCK" | "SHIPPED" | "DELIVERED";

export const statusLabels = {
    IN_STOCK: "En stock",
    SHIPPED: "Expédié",
    DELIVERED: "Livré",
};

export const statusStyles = { 
    IN_STOCK: "bg-blue-100 text-blue-700",
    SHIPPED: "bg-purple-100 text-purple-700",
    DELIVERED: "bg-emerald-100 text-emerald-700"
};

export interface Product {
    id: number;
    description: string;
    poids: number;
    longueur: number;
    largeur: number;
    hauteur: number;
    volume: number;
    origine: string;
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

export type UpdateProductData = CreateProductData & {id: number}

export interface ProductListProps {
    products: Product[];
    isPending: boolean;
    onEdit: (product: Product) => void;
    onDelete: (id: number) => void;
    onView: (product: Product) => void;
};

export interface ProductFormProps {
    onSubmit: (data: CreateProductData) => void;
    onCancel: () => void;
    initialData?: Product | null;
    isSubmitting?: boolean;
};

export interface ProductCardProps {
    inStock: number;
    shipped: number;
    delivered: number;
};

export interface ProductDetailsModalProps {
    product: Product;
    onClose: () => void;
    onEdit: (product: Product) => void;
    onDelete: (productId: number) => void;
};

export interface ConfirmDialogProps {
    isOpen: boolean;
    title: string;
    message: string;
    isPending?: boolean;
    onConfirm: () => void;
    onCancel: () => void;
};

