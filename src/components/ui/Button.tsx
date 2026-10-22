import type { ReactNode } from "react";

type VariantClasses = "primary" | "secondary" | "tertiary" | "neutral"

type SizeClasses = "small" | "medium" | "large"

interface ButtonProps {
    variant: VariantClasses;
    size: SizeClasses;
    custom?: string;
    content: ReactNode;
    font?: string;
    onClick?: () => void;
}

export const Button = ({variant, size, content, font="font-manrope", custom, onClick}: ButtonProps) => {

    const variantSize = {
        small: "rounded-md py-1 px-2",
        medium: "rounded-xl py-2 px-4",
        large: "rounded-2xl py-2 px-2 lg:px-6"
    }

    const variantClasses = {
        primary: "bg-primary text-white",
        secondary: "bg-secondary text-white",
        tertiary: "bg-tertiary text-white",
        neutral: "bg-neutral text-white",
    };

    return (
        <button className={`w-full ${variantClasses[variant]} ${variantSize[size]} ${font} ${custom}`} onClick={onClick}>
            {content}
        </button>
    )

}