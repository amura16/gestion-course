import type { LucideIcon } from "lucide-react";

type IconButtonProps = {
    icon: LucideIcon;
    label: string;
    onClick?: () => void;
    size?: number;
    showIndicator?: boolean;
    className?: string;
};

export const IconButton = ({icon: Icon, label, onClick, size = 20, showIndicator = false, className = ""}: IconButtonProps) => {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={label}
            className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-600 transition-all duration-200 hover:bg-slate-100 hover:text-slate-900 active:scale-95 ${className}`}
        >
            <Icon size={size} />

            {showIndicator && (
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-500 ring-2 ring-white" />
            )}
        </button>
    );
};