import React from 'react';
import Link from 'next/link';
import ProductSorting from '../ProductSorting';


export const instant = false;

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

// Dynamic Category Page
const CategoryPages = async ({ params, searchParams }) => {
    const { id } = await params;

    const resolvedSearchParams = await searchParams;
    const sortOption = resolvedSearchParams.sort || "default";

    const res = await fetch(`https://api.abcz.workers.dev/api/bazardor/products?category=${id}`, {
        next: {
            revalidate: 3600
        }
    });

    if (!res.ok) {
        return <div className="p-10 text-xl font-bold text-center">কোনো পণ্য পাওয়া যায়নি।</div>;
    }

    const categorys = await res.json();

    if (!categorys || categorys.length === 0) {
        return <div className="p-10 text-xl font-bold text-center">এই ক্যাটাগরিতে কোনো পণ্য নেই।</div>;
    }

    const categoryName = categorys[0].categoryNameBn || "ক্যাটাগরি";
    const categoryIcon = categorys[0].categoryIcon || "📦";

    const sortedProducts = [...categorys].sort((a, b) => {
        if (sortOption === "price-low") {
            return (a.today || 0) - (b.today || 0);
        }
        if (sortOption === "price-high") {
            return (b.today || 0) - (a.today || 0);
        }
        return 0;
    });

    return (
        <div className="min-h-screen bg-[#f3f6f3] p-6 md:p-12 text-gray-800">
            <div className="max-w-5xl mx-auto space-y-6">

                <nav className="text-xs text-gray-500 flex items-center gap-2">
                    <span>
                        হোম
                    </span>
                    <span>›</span>
                    <span className="text-gray-700 font-medium">{categoryName}</span>
                </nav>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center text-3xl">
                        {categoryIcon}
                    </div>
                    <div>
                        <h1 className="text-2xl font-extrabold text-gray-900">{categoryName}</h1>
                        <p className="text-xs text-gray-500 mt-1">
                            মোট {toBanglaNumber(categorys.length)}টি পণ্য পাওয়া গেছে
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex justify-end items-center">
                    <ProductSorting id={id} currentSort={sortOption} />
                </div>

                {/* Product List Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {sortedProducts.map((product) => {
                        const pct = product.change.pct ? Math.abs(product.change.pct) : 0;
                        const isUp = product.change.dir === "up";
                        const isDown = product.change.dir === "down";

                        return (
                            <Link
                                href={`/productsdetails/${product.id}`}
                                key={product.id}
                                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition duration-200 flex flex-col justify-between"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-[#f2f6f3] rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                                        {product.categoryIcon || "🍚"}
                                    </div>
                                    <div>
                                        <h2 className="text-base font-bold text-gray-900">{product.nameBn}</h2>
                                        <p className="text-xs text-gray-500 mt-0.5">
                                            প্রতি {getBanglaUnit(product.unit)}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                                    <div>
                                        <span className="text-[10px] text-gray-400 block">আজকের দাম</span>
                                        <span className="text-lg font-extrabold text-gray-900">
                                            {toBanglaNumber(product.today)} <span className="text-xs font-normal text-gray-600">টাকা</span>
                                        </span>
                                    </div>

                                    <div>
                                        {isUp && (
                                            <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded-md">
                                                ▲ {toBanglaNumber(pct)}%
                                            </span>
                                        )}
                                        {isDown && (
                                            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                                                ▼ {toBanglaNumber(pct)}%
                                            </span>
                                        )}
                                        {!isUp && !isDown && (
                                            <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                                                — ০০০%
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

            </div>
        </div>
    );
};

export default CategoryPages;