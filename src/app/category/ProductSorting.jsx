"use client";

import { useRouter } from "next/navigation";

export default function ProductSorting({ id, currentSort }) {
    const router = useRouter();

    const handleSortChange = (e) => {
        const selectedSort = e.target.value;
        router.push(`/category/${id}?sort=${selectedSort}`);
    };

    return (
        <div className="flex items-center gap-3">
            <span className="text-sm font-normal text-gray-600">সাজান</span>
            <select
                value={currentSort}
                onChange={handleSortChange}
                className="bg-white border border-gray-300 text-gray-800 text-sm rounded-xl px-4 py-2 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer font-normal shadow-sm"
            >
                <option value="default">ডিফল্ট</option>
                <option value="price-low">কম থেকে বেশি</option>
                <option value="price-high">বেশি থেকে কম</option>
            </select>
        </div>
    );
}