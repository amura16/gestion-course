interface CardProps {
    content: string;
}

export const Card = ({ content }: CardProps) => {
    return (
        <div className="w-50 h-15 bg-white rounded-md shadow-md flex justify-center items-center">
            {content}
        </div>
    );
};