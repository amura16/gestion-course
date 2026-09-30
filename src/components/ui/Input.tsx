import type { ReactNode, ChangeEvent } from "react";

interface InputProps {
    placeholder?: string;
    value?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    leftContent?: ReactNode;
    rightContent?: ReactNode;
    type?: string;
    disabled?: boolean;
}

export const Input = ({
    placeholder,
    value,
    onChange,
    leftContent,
    rightContent,
    type = "text",
    disabled = false,
}: InputProps) => {
    return (
        <div className="flex items-center w-full h-10 bg-white border border-gray-200 rounded-lg px-3 shadow-sm focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition">

            {leftContent && (
                <div className="flex items-center mr-2 text-gray-400">
                    {leftContent}
                </div>
            )}

            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                className="flex-1 min-w-0 outline-none bg-transparent text-sm text-gray-800 placeholder:text-gray-400 disabled:cursor-not-allowed"
            />

            {rightContent && (
                <div className="flex items-center ml-2 text-gray-400">
                    {rightContent}
                </div>
            )}

        </div>
    );
};