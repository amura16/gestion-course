type LoaderProps = {
    message?: string;
};

export function Loader({ message = "Chargement des produits..." }: LoaderProps) {
    return (
        <div className="flex flex-col items-center justify-center gap-3 py-10">
            <div className="loader" />
            <p className="text-sm text-slate-500">{message}</p>
        </div>
    );
}