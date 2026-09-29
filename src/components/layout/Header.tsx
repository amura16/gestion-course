import Burger from "../../assets/burger-bar.png"
import { Input } from "../ui/Input"
import { Toogle } from "../ui/Toogle"

interface HeaderProps {
    onMenuClick: () => void
}

export const Header = ({onMenuClick}: HeaderProps ) => {

    return (
        <header className="fixed top-0 right-0 z-50 h-18 w-full md:w-[80%] flex items-center shadow-md bg-white py-2 px-4 gap-2 flex justify-between">

            <div className="hidden sm:flex bg-gray-300 rounded-lg p-1 w-60 shadow-lg">
                <Toogle
                    content="ESPACE CLIENT"
                    isActive
                />

                <Toogle
                    content="ESPACE TRANSPORT"
                />
            </div>

            {/* search bar */}
            <div className="w-75 border rounded-lg shadow-lg">
                <Input 
                    placeholder="Rechercher"
                />
            </div>

            {/* Burger mobile */}
            <button
                className="ml-4 text-2xl md:hidden"
                onClick={onMenuClick}
            >
                <img src={Burger} alt="" className="h-8 w-14"/>
            </button>

            <div className="shadow-lg rounded-lg h-full w-64 hidden md:flex items-center justify-center">
                Marc Dupont
            </div>

        </header>
    )
}