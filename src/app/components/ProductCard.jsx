"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from "@/lib/auth-client"; // আপনার প্রজেক্টের সঠিক পাথ অনুযায়ী ঠিক করে নেবেন

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

export default function ProductCard() {
    const router = useRouter();
    const { data: session } = authClient.useSession();

    const [datas, setDatas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://api.abcz.workers.dev/api/bazardor/products')
            .then((res) => res.json())
            .then((data) => {
                setDatas(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to fetch products:", err);
                setLoading(false);
            });
    }, []);

    const handleProductClick = (e, productId) => {
        e.preventDefault();

        if (session) {
            router.push(`/productsdetails/${productId}`);
        } else {
            localStorage.setItem("redirectProductId", productId);
            router.push('/signin');
        }
    };

    if (loading) {
        return <div className="text-center py-20 text-xl font-bold">লোড হচ্ছে...</div>;
    }

    const increasedProducts = datas.filter(
        (data) => data.change.dir === "up"
    );

    const decreasedProducts = datas.filter(
        (data) => data.change.dir === "down"
    );

    return (
        <div id='products' className='max-w-7xl mx-auto px-4 md:px-8 w-[90%]'>
            <div>
                <div className="pt-10">

                    {/* দাম বেড়েছে সেকশন */}
                    <div className="mt-10">
                        <h2 className="text-3xl font-bold">
                            🔼 আজ দাম বেড়েছে
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-4">
                            {increasedProducts.map((data) => (
                                <div
                                    key={data.id}
                                    onClick={(e) => handleProductClick(e, data.id)}
                                    className="shadow card card-border bg-base-100 w-full p-5 cursor-pointer"
                                >
                                    <div className="flex items-center gap-2">
                                        <p className="text-[40px] px-2 py-1 bg-gray-200 rounded-2xl font-extrabold">
                                            {data.categoryIcon}
                                        </p>

                                        <div>
                                            <h3 className="text-2xl font-extrabold">
                                                {data.nameBn}
                                            </h3>

                                            <p>
                                                প্রতি {getBanglaUnit(data.unit)}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="pt-5 flex justify-between items-center">
                                        <p>
                                            {toBanglaNumber(data.today)} টাকা/
                                            {getBanglaUnit(data.unit)}
                                        </p>

                                        <p className="bg-red-50 rounded-full p-2 text-red-600 font-bold">
                                            🔼 {toBanglaNumber(Math.abs(data.change.pct))}%
                                        </p>
                                    </div>
                                </div>
                            )).slice(0, 6)}
                        </div>
                    </div>

                    {/* দাম কমেছে সেকশন */}
                    <div className="mt-10">
                        <h2 className="text-3xl font-bold">
                            🔽 আজ দাম কমেছে
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-4">
                            {decreasedProducts.map((data) => (
                                <div
                                    key={data.id}
                                    onClick={(e) => handleProductClick(e, data.id)}
                                    className="shadow card card-border bg-base-100 w-full p-5 cursor-pointer"
                                >
                                    <div className="flex items-center gap-2">
                                        <p className="text-[40px] px-2 py-1 bg-gray-200 rounded-2xl font-extrabold">
                                            {data.categoryIcon}
                                        </p>

                                        <div>
                                            <h3 className="text-2xl font-extrabold">
                                                {data.nameBn}
                                            </h3>

                                            <p>
                                                প্রতি {getBanglaUnit(data.unit)}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="pt-5 flex justify-between items-center">
                                        <p>
                                            {toBanglaNumber(data.today)} টাকা/
                                            {getBanglaUnit(data.unit)}
                                        </p>

                                        <p className="bg-emerald-50 rounded-full p-2 text-emerald-600 font-bold">
                                            🔽 {toBanglaNumber(Math.abs(data.change.pct))}%
                                        </p>
                                    </div>
                                </div>
                            )).slice(0, 6)}
                        </div>
                    </div>

                </div>
            </div>

            {/* সকল পণ্য সেকশন */}
            <div>
                <div className='p-5'>
                    <h3 className='text-5xl font-extrabold'>সব পণ্য</h3>
                    <p className='font-extralight text-[16px]'>মোট {toBanglaNumber(datas.length)} টি পণ্য দেখানো হয়েছে। </p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 container mx-auto gap-5 mt-2'>

                    {datas.map(data => (
                        <div
                            className="shadow card card-border bg-base-100 w-full p-5 cursor-pointer"
                            key={data.id}
                            onClick={(e) => handleProductClick(e, data.id)}
                        >
                            <div className='flex items-center gap-2'>
                                <p className='text-[40px] px-2 py-1 bg-gray-200 rounded-2xl font-extrabold'>{data.categoryIcon}</p>
                                <div>
                                    <h3 className='flex flex-col text-2xl font-extrabold'>{data.nameBn}</h3>
                                    <p>প্রতি {getBanglaUnit(data.unit)}</p>
                                </div>
                            </div>
                            <div className='pt-5 flex flex-col gap-3'>
                                <h3 className='text-[20px]'>আজকের দাম</h3>
                                <span className='flex justify-between items-center'>
                                    <p>
                                        {toBanglaNumber(data.today)} টাকা/
                                        {getBanglaUnit(data.unit === "kg"
                                            ? "কেজি"
                                            : data.unit)}
                                    </p>

                                    <span>
                                        <p className={`rounded-full p-2 px-3 text-[14px] font-bold ${data.change.dir === "up"
                                            ? "bg-red-50 text-red-600"
                                            : data.change.dir === "down"
                                                ? "bg-emerald-50 text-emerald-600"
                                                : "bg-gray-100 text-gray-600"
                                            }`}>
                                            {data.change.dir === "up" && "🔼"}
                                            {data.change.dir === "down" && "🔽"}
                                            {data.change.dir === "flat" && "➖"}

                                            {" "}
                                            {toBanglaNumber(Math.abs(data.change.pct))}%
                                        </p>
                                    </span>
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}