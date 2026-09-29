import Burger from "../../assets/burger-bar.png"

interface HeaderProps {
    onMenuClick: () => void
}

export const Header = ({onMenuClick}: HeaderProps ) => {
    return (
        <header className="fixed top-0 right-0 z-50 h-18 w-full md:w-[80%] flex items-center shadow-md bg-white">
            {/* Burger mobile */}
            <button
                className="ml-4 text-2xl md:hidden"
                onClick={onMenuClick}
            >
                <img src={Burger} alt="" className="h-8"/>
            </button>
        </header>
    )
}