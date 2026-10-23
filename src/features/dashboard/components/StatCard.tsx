import type { StatCardProps } from "../types/dashboard.types";

export const StatCard = ({title, value, icon: Icon, iconClassName = "bg-blue-50 text-blue-600", percentage, gaugeColor = "#2563EB", onClick}: StatCardProps) => {
    const radius = 22;
    const circumference = 2 * Math.PI * radius;
    let normalizedPercentage = 0;
    let progress = 0

    if (percentage){
        normalizedPercentage = Math.min(
            100,
            Math.max(0, percentage),
        );

        progress = (normalizedPercentage / 100) * circumference;
    } 

    return (
        <div
            onClick={onClick}
            className={`flex items-center justify-between gap-3 p-4 sm:p-5 ${
                onClick
                    ? "cursor-pointer transition-colors hover:bg-slate-50"
                    : ""
            }`}
        >
            <div className="flex min-w-0 items-center gap-3">
                <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconClassName}`}
                >
                    <Icon size={20} />
                </div>

                <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-500">
                        {title}
                    </p>

                    <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                        {value.toLocaleString("fr-FR")}
                    </p>
                </div>
            </div>

            {percentage && (
                <div className="relative h-14 w-14 shrink-0">
                    <svg
                        viewBox="0 0 56 56"
                        className="h-full w-full -rotate-90"
                        role="img"
                        aria-label={`${Math.round(normalizedPercentage)} %`}
                    >
                        <circle
                            cx="28"
                            cy="28"
                            r={radius}
                            fill="none"
                            stroke="#E2E8F0"
                            strokeWidth="5"
                        />

                        <circle
                            cx="28"
                            cy="28"
                            r={radius}
                            fill="none"
                            stroke={gaugeColor}
                            strokeWidth="5"
                            strokeLinecap="round"
                            strokeDasharray={`${progress} ${circumference}`}
                            className="transition-all duration-700 ease-out"
                        />
                    </svg>

                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-bold text-slate-700">
                            {Math.round(normalizedPercentage)}%
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};