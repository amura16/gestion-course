import { useEspace } from "@/store/useEspace";
import { Toogle } from "./Toogle"

export const EspaceToogle = () => {
    const espace = useEspace((state) => state.espace);

    const changeEspace = useEspace((state) => state.changeEspace);

    return (
        <div className="flex h-11 w-56 shrink-0 items-center rounded-xl bg-slate-100 shadow-inner overflow-hidden">

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