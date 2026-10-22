import { Toogle } from "./Toogle"

export const EspaceToogle = () => {
    return (
        <div className="hidden h-11 w-56 shrink-0 items-center rounded-xl bg-slate-100 p-1 shadow-inner sm:flex">

            <Toogle
                content={
                    <p className="text-center text-[11px] leading-tight">
                        ESPACE
                        <br />
                        CLIENT
                    </p>
                }
                isActive={espace === "CLIENT"}
                onClick={() => changeEspace("CLIENT")}
            />

            <Toogle
                content={
                    <p className="text-center text-[11px] leading-tight">
                        ESPACE
                        <br />
                        TRANSPORT
                    </p>
                }
                isActive={espace === "CARRIER"}
                onClick={() => changeEspace("CARRIER")}
            />

        </div>
    )
}