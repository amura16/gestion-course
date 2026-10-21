import React from "react";

interface ToogleProps {
    content: React.ReactNode;
    size?: string;
    onClick?: () => void;
    isActive?: boolean;
}


export const Toogle = ({content, onClick,size, isActive=false}: ToogleProps) => {

    const activated = " bg-white rounded-2xl";

    return (
        <div 
            className={`w-${size} ${isActive && activated} px-2 h-full w-full flex justify-center items-center cursor-pointer`}
            onClick={onClick}
        >
            {content}
        </div>
    )
}