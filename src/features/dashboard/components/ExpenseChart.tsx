import { useMemo, useState } from "react";
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import { Card } from "@/components/ui/Card";
import type { ExpenseChartProps, Period } from "../types/dashboard.types";

const currencyFormatter = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "MGA",
    maximumFractionDigits: 0,
});

export const ExpenseChart = ({ data }: ExpenseChartProps) => {
    const [period, setPeriod] = useState<Period>(6);

    const chartData = useMemo(
        () => data.slice(-period),
        [data, period],
    );

    const totalExpenses = chartData.reduce(
        (total, item) => total + item.amount,
        0,
    );

    return (
        <Card className="h-full min-w-0">
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                    <h2 className="text-lg font-semibold text-slate-800">
                        Dépenses de transport
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Montant des courses sur la période
                    </p>
                </div>

                <select
                    aria-label="Période des dépenses"
                    value={period}
                    onChange={(event) =>
                        setPeriod(Number(event.target.value) as Period)
                    }
                    className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                    <option value={6}>6 derniers mois</option>
                    <option value={12}>12 derniers mois</option>
                </select>
            </div>

            <div className="mt-5">
                <p className="text-2xl font-bold tracking-tight text-slate-900">
                    {currencyFormatter.format(totalExpenses)}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                    Total sur la période sélectionnée
                </p>
            </div>

            <div className="mt-6 h-56 w-full min-w-0">
                {chartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={chartData}
                            margin={{
                                top: 10,
                                right: 12,
                                left: 12,
                                bottom: 0,
                            }}
                        >
                            <CartesianGrid
                                stroke="#E2E8F0"
                                strokeDasharray="3 3"
                                vertical={false}
                            />

                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                                tick={{ fill: "#64748B", fontSize: 12 }}
                                minTickGap={12}
                            />

                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                width={65}
                                tick={{ fill: "#64748B", fontSize: 11 }}
                                tickFormatter={(value: number) =>
                                    `${Math.round(value / 1000)}k`
                                }
                            />

                            <Tooltip
                                formatter={(value) => [
                                    currencyFormatter.format(Number(value)),
                                    "Dépenses",
                                ]}
                                contentStyle={{
                                    borderRadius: "12px",
                                    border: "1px solid #E2E8F0",
                                    fontSize: "12px",
                                }}
                            />

                            <Line
                                type="monotone"
                                dataKey="amount"
                                name="Dépenses"
                                stroke="#2563EB"
                                strokeWidth={3}
                                dot={false}
                                activeDot={{
                                    r: 5,
                                    strokeWidth: 0,
                                }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="flex h-full items-center justify-center text-sm text-slate-500">
                        Aucune dépense disponible pour cette période.
                    </div>
                )}
            </div>
        </Card>
    );
};