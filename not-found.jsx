import Link from 'next/link';
import React from 'react';
const NotFound = () => {
    return (
        <div className="min-h-[80vh] bg-[#f4f7f4] flex flex-col items-center justify-center px-4 text-center">
            <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                <div className="space-y-2">
                    <h1 className="text-7xl font-extrabold text-[#048848]">404</h1>
                    <h2 className="text-2xl font-bold text-gray-800">
                        পেজটি পাওয়া যায়নি!
                    </h2>
                    <p className="text-gray-500 text-sm">
                        আপনি যে পেজটি খুঁজছেন তা মুছে ফেলা হয়েছে অথবা ইউআরএল (URL) টি ভুল লেখা হয়েছে।
                    </p>
                </div>

                <div>
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 w-full bg-[#048848] hover:bg-[#03703b] text-white font-medium py-3 px-6 rounded-xl transition-colors shadow-sm"
                    >
                        হোম পেজে ফিরে যান
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;