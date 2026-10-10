import React from 'react';

const toBanglaNumber = (number) => {
    if (number === undefined || number === null || isNaN(number)) return '০';
    return number
        .toString()
        .replace(/\d/g, (digit) => '০১২৩৪৫৬৭৮৯'[digit]);
};

const getBanglaUnit = (unit) => {
    const units = {
        kg: "কেজি",
        dozen: "ডজন",
        litre: "লিটার",
        piece: "পিস",
    };

    return units[unit] || unit;
};

const PriceTicker = async () => {
    const res = await fetch(
        "https://api.abcz.workers.dev/api/bazardor/products",
        {
            next: {
                revalidate: 3600,
            },
        }
    );

    if (!res.ok) {
        return null;
    }

    const datas = await res.json();

    if (!datas || datas.length === 0) {
        return null;
    }

    const tickerItems = [...datas, ...datas];

    return (
        <div className="overflow-hidden border-t border-b border-dotted py-2.5 mt-2 bg-white shadow-sm ">
            <div className="flex w-max gap-8 animate-ticker">
                {tickerItems.map((data, index) => {
                    const pct = data?.change?.pct ? Math.abs(data.change.pct) : 0;
                    const dir = data?.change?.dir || "flat";

                    return (
                        <div
                            key={`${data.id}-${index}`}
                            className="flex items-center gap-2.5 whitespace-nowrap text-sm text-gray-800"
                        >
                            <span className="text-base">{data.categoryIcon || "🍚"}</span>

                            <h4 className="font-bold text-gray-900">{data.nameBn}</h4>

                            <p className="flex items-baseline gap-0.5">
                                <span className="text-base font-extrabold text-gray-900">
                                    {toBanglaNumber(data.today)}
                                </span>
                                <span className="text-xs text-gray-600">
                                    টাকা/{getBanglaUnit(data.unit)}
                                </span>
                            </p>

                            <span
                                className={`text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1 ${dir === "up"
                                    ? "bg-red-50 text-red-600 border border-red-100"
                                    : dir === "down"
                                        ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                                        : "bg-gray-100 text-gray-600"
                                    }`}
                            >
                                {dir === "up" && "▲"}
                                {dir === "down" && "▼"}
                                {dir === "flat" && "—"}
                                <span>{toBanglaNumber(pct)}%</span>
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PriceTicker;