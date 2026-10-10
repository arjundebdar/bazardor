
import React from 'react';

export const instant = false;

// export async function generateStaticParams() {
//     const res = await fetch(`https://api.api-store.workers.dev/api/bazardor/products/${id}`);
//     const products = await res.json();

//     return products.map((product) => ({
//         id: String(product.id),
//     }));
// }

const getBanglaUnit = (unit) => {
    const units = {
        kg: "কেজি",
        dozen: "ডজন",
        litre: "লিটার",
        piece: "পিস",
    };

    return units[unit] || unit;
};

const toBanglaNumber = (number) => {
    if (number === undefined || number === null || isNaN(number)) return '০';
    return number
        .toString()
        .replace(/\d/g, (digit) => '০১২৩৪৫৬৭৮৯'[digit]);
};

const ProductDetailPage = async ({ params }) => {
    const { id } = await params;

    const res = await fetch(`https://api.abcz.workers.dev/api/bazardor/products/${id}`, {
        next: {
            revalidate: 3600,
        },
    });

    if (!res.ok) {
        return <div className="p-10 text-xl font-bold text-center">পণ্য পাওয়া যায়নি।</div>;
    }


    const product = await res.json();

    const differPrice = () => {
        if (product.today > product.yesterday) {
            const diff = product.today - product.yesterday;
            return (
                <span>
                    গতকালকের তুলনায় আজ দাম <span className="font-semibold text-gray-800">বেড়েছে {toBanglaNumber(diff)} টাকা</span>
                </span>
            );
        } else if (product.today < product.yesterday) {
            const diff = product.yesterday - product.today;
            return (
                <span>
                    গতকালকের তুলনায় আজ দাম <span className="font-semibold text-gray-800">কমেছে {toBanglaNumber(diff)} টাকা</span>
                </span>
            );
        } else {
            return <span>গতকালকের মতোই দাম অপরিবর্তিত আছে।</span>;
        }
    };

    const productUpOrDown = () => {
        const pct = product.change.pct ? Math.abs(product.change.pct) : 0;

        if (product.change.dir === "up") {
            return <span className='text-red-500 font-bold text-sm'>▲ {toBanglaNumber(pct)}%</span>;
        } else if (product?.change?.dir === "down") {
            return <span className='text-green-600 font-bold text-sm'>▼ {toBanglaNumber(pct)}%</span>;
        } else {
            return <span className='text-gray-500 font-bold text-sm'>— ০০০%</span>;
        }
    };

    const markets = product?.markets || [];

    const minPrice = markets.length > 0
        ? Math.min(...markets.map(m => m.min))
        : product.today;

    const maxPrice = markets.length > 0
        ? Math.max(...markets.map(m => m.max))
        : product.today;

    const avgPrice = markets.length > 0
        ? Math.round(markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) / markets.length)
        : product.today;

    return (
        <div className="min-h-screen bg-[#f3f6f3] p-6 md:p-12 text-gray-800">
            <div className="max-w-5xl mx-auto space-y-6">


                <nav className="text-xs text-gray-500 flex items-center gap-2">
                    <span>হোম</span>
                    <span>›</span>
                    <span >{product.categoryNameBn || "চাল"}</span>
                    <span>›</span>
                    <span className="text-gray-700 font-medium">{product.nameBn}</span>
                </nav>


                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-5">
                        <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center text-4xl">
                            {product.categoryIcon || "🍚"}
                        </div>
                        <div>
                            <h1 className="text-3xl font-extrabold text-gray-900">{product.nameBn}</h1>
                            <p className="text-xs text-gray-500 mt-1">
                                প্রতি {getBanglaUnit(product.unit)} • {product.categoryNameBn}
                            </p>
                            <p className="text-xs text-gray-500 mt-2">
                                {differPrice()}
                            </p>
                        </div>
                    </div>

                    <div className="bg-[#f2f6f3] px-8 py-4 rounded-xl text-center min-w-[150px] self-stretch md:self-auto flex flex-col justify-center items-center">
                        <span className="text-xs text-gray-500">আজকের দাম</span>
                        <div className="text-3xl font-extrabold text-gray-900 my-0.5">
                            {toBanglaNumber(product.today)}
                        </div>
                        <span className="text-xs text-gray-500 mb-1">
                            টাকা / {getBanglaUnit(product.unit)}
                        </span>
                        <div>
                            {productUpOrDown()}
                        </div>
                    </div>
                </div>



                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6">


                    <div>
                        <h2 className="text-base font-bold text-gray-900 mb-3">দামের সারসংক্ষেপ</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                            <div className="border border-gray-100 rounded-xl p-4 bg-white">
                                <span className="text-xs text-gray-500 block">সর্বনিম্ন দাম</span>
                                <div className="text-lg font-bold text-emerald-600 mt-1">
                                    {toBanglaNumber(minPrice)} <span className="text-sm font-semibold">টাকা</span>
                                </div>
                                <span className="text-[11px] text-gray-400 mt-1 block">সবচেয়ে কম দামের বাজার</span>
                            </div>


                            <div className="border border-gray-100 rounded-xl p-4 bg-white">
                                <span className="text-xs text-gray-500 block">সর্বাধিক দাম</span>
                                <div className="text-lg font-bold text-rose-600 mt-1">
                                    {toBanglaNumber(maxPrice)} <span className="text-sm font-semibold">টাকা</span>
                                </div>
                                <span className="text-[11px] text-gray-400 mt-1 block">সবচেয়ে বেশি দামের বাজার</span>
                            </div>


                            <div className="border border-gray-100 rounded-xl p-4 bg-white">
                                <span className="text-xs text-gray-500 block">গড় দাম</span>
                                <div className="text-lg font-bold text-emerald-600 mt-1">
                                    {toBanglaNumber(avgPrice)} <span className="text-sm font-semibold">টাকা</span>
                                </div>
                                <span className="text-[11px] text-gray-400 mt-1 block">
                                    প্রতি {getBanglaUnit(product.unit)}-এর হিসাবে
                                </span>
                            </div>

                        </div>
                    </div>


                    <div>
                        <h2 className="text-base font-bold text-gray-900 mb-3">বাজারভিত্তিক আজকের দাম</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs text-gray-700">
                                <thead>
                                    <tr className="border-b border-gray-200 text-gray-600 font-semibold text-[20px]">
                                        <th className="py-3 px-3">বাজার</th>
                                        <th className="py-3 px-3">বিভাগ</th>
                                        <th className="py-3 px-3 text-right">সর্বনিম্ন</th>
                                        <th className="py-3 px-3 text-right">সর্বাধিক</th>
                                        <th className="py-3 px-3 text-right">গড়</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {markets.map((m, index) => {
                                        const marketAvg = Math.round((m.min + m.max) / 2);
                                        return (
                                            <tr key={index} className="hover:bg-gray-50/50 text-[14px]">
                                                <td className="py-3 px-3 font-medium text-gray-800">{m.market}</td>
                                                <td className="py-3 px-3 text-gray-500">{m.division}</td>
                                                <td className="py-3 px-3 text-right font-medium text-gray-800">
                                                    {toBanglaNumber(m.min)} টাকা
                                                </td>
                                                <td className="py-3 px-3 text-right font-medium text-gray-800">
                                                    {toBanglaNumber(m.max)} টাকা
                                                </td>
                                                <td className="py-3 px-3 text-right font-bold text-gray-900">
                                                    {toBanglaNumber(marketAvg)} টাকা
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;