interface CardProps {
    content: string;
}

export const Card = ({ content }: CardProps) => {
    return (
        <div className="w-[200px] h-[60px] bg-white rounded-md shadow-md flex justify-center items-center">
            {content}
        </div>
    );
};