import type { ReactNode } from "react";

type CardProps = {
    title?: string;
    description?: string;
    children: ReactNode;
    className?: string;
    onClick?: () => void;
};

export const Card = ({ title, description, children, className = "", onClick }: CardProps) => (
    <div onClick={onClick} className={`rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md ${className}`}>
        {(title || description) && (
            <div className="mb-4">
                {title && <h2 className="text-lg font-semibold text-slate-800">{title}</h2>}
                {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
            </div>
        )}
        {children}
    </div>
);