interface CardProps {
    content: string
}

export const Card = ({content}: CardProps) => {
    return (
        <div className="rounded-md flex justify-center items-center">
            {content}
        </div>
    )
}