interface InputProps {
    placeholder?: string;
    onChange?: () => void; 
}

export const Input = ({placeholder, onChange}: InputProps) => {
    return(
        <input 
            type="text" 
            className="w-full py-1 px-2 rounded-md"
            placeholder={placeholder}
            onChange={onChange}
        />
    )
}