interface CardProps {
    content: string;
    isActive: boolean;
    onClick: () => void;
}

export const Card = ({ content, isActive, onClick}: CardProps) => {

    const activated = `${isActive?"bg-gray-100": "bg-white"}`

    return (
        <div 
            className={`w-[200px] h-[60px] rounded-md shadow-md flex justify-center items-center ${activated}`}
            onClick={onClick}
        >
            {content}
        </div>
    );
};