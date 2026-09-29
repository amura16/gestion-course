interface ToogleProps {
    content: string;
    size?: string;
    onClick?: () => void;
    isActive?: boolean;
}


export const Toogle = ({content, onClick,size, isActive=false}: ToogleProps) => {

    const activated = " bg-white rounded-md";

    return (
        <div 
            className={`w-${size} ${isActive && activated} px-2 h-full w-full flex justify-center items-center`}
            onClick={onClick}
        >
            {content}
        </div>
    )
}