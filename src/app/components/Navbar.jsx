import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PriceTicker from './PriceTicker';
import UserMenu from './UserMenu';

const date = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
});

const Navbar = async () => {
    const res = await fetch(
        "https://api.abcz.workers.dev/api/bazardor/categories",
        {
            next: {
                revalidate: 3600,
            },
        }
    );
    const datas = await res.json();

    return (
        <header className=' bg-white shadow-sm flex flex-col justify-around'>
            {/* Top Bar: Logo & UserMenu */}
            <div className='sm:px-6 lg:px-8 py-3 flex flex-row justify-around sm:justify-around items-center gap-2'>
                <Link href={'/'}>
                    <div className='flex flex-row items-center gap-1.5 sm:gap-2'>
                        <Image
                            src={'/add-to-cart.png'}
                            alt='Bazardor_Logo'
                            width={60}
                            height={20}
                            className="w-10 h-10 sm:w-14 sm:h-14 object-contain"
                        />
                        <div>
                            <h1 className='font-extrabold text-xl sm:text-2xl md:text-[30px] leading-tight text-gray-900'>
                                বাজার দর
                            </h1>
                            <p className='text-[10px] sm:text-[12px] text-gray-600 font-extralight whitespace-nowrap'>
                                {date}
                            </p>
                        </div>
                    </div>
                </Link>
                <div className="flex-shrink-0">
                    <UserMenu />
                </div>
            </div>

            <div className="w-full border-t border-gray-100 shadow-[0_-4px_8px_-6px_rgba(0,0,0,0.1)]">
                <div className="max-w-7xl mx-auto px-4 flex flex-row gap-4 sm:gap-6 justify-start sm:justify-center items-center py-3 overflow-x-auto no-scrollbar whitespace-nowrap">
                    {datas.map((data) => (
                        <Link
                            href={`/category/${data.id}`}
                            key={data.id}
                            className="flex flex-row items-center gap-1.5 text-sm sm:text-base text-gray-700 hover:text-emerald-600 hover:border-b hover:border-b-emerald-600 pb-0.5 transition-colors flex-shrink-0"
                        >
                            <span>{data.icon}</span>
                            <span className="font-medium">{data.nameBn}</span>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="w-full">
                <PriceTicker />
            </div>
        </header>
    );
};

export default Navbar;