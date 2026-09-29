type VariantClasses = "primary" | "secondary" | "tertiary" | "neutral"

type SizeClasses = "small" | "medium" | "large"

interface ButtonProps {
    variant: VariantClasses;
    size: SizeClasses;
    custom?: string;
    content: string;
}

export const ButtonGlobal = ({variant, size, content}: ButtonProps) => {

    const variantSize = {
        small: "rounded-md py-1 px-2",
        medium: "rounded-md py-2 px-4",
        large: "rounded-2xl py-2 px-10"
    }

    const variantClasses = {
        primary: "bg-primary",
        secondary: "bg-secondary",
        tertiary: "bg-tertiary",
        neutral: "bg-neutral",
    };

    return (
        <button className={`${variantClasses[variant]} ${variantSize[size]}`}>
            {content}
        </button>
    )

}