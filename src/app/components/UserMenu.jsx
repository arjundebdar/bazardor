"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";
import toast from "react-hot-toast";

import React from 'react';

const UserMenu = () => {
    const { data: session, isPending } = useSession();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);



    const handleSignOut = async () => {
        try {
            await signOut();
            toast.success("সাইন আউট সফল হয়েছে!");
            setIsOpen(false);
        } catch (error) {
            toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
        }
    };

    if (!session) {
        return (
            <div className="flex flex-row gap-4 justify-center items-center">
                <Link href="/signin">
                    <button className="btn btn-neutral btn-outline">সাইন ইন</button>
                </Link>
                <Link href="/signup">
                    <button className="btn btn-secondary">সাইন আপ</button>
                </Link>
            </div>
        );
    }
    const user = session.user;

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 focus:outline-none hover:bg-gray-100 p-1.5 rounded-full transition-colors"
            >
                <div className="w-10 h-10 rounded-full overflow-hidden relative border border-gray-200">
                    <Image
                        src={user.image || "/default-avatar.png"} // ডিফল্ট অবতার ইমেজ সেট করতে পারেন
                        alt={user.name}
                        width={100}
                        height={100}
                    />
                </div>
                <span className="font-medium text-gray-800 text-sm md:text-base">
                    {user.name.split(" ")[0]}
                </span>
                <svg
                    className={`w-4 h-4 text-gray-600 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>


            {isOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 p-5 z-50 animate-in fade-in zoom-in-95 duration-150">
                    {/* নাম ও ইমেইল */}
                    <div className="mb-4 border-b border-gray-100 pb-3">
                        <h4 className="font-bold text-gray-900 text-base">{user.name}</h4>
                        <p className="text-sm text-gray-500 truncate">{user.email}</p>
                    </div>

                    <div className="space-y-3">
                        <Link
                            href="/profileupdate"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors text-sm font-medium"
                        >
                            <svg
                                className="w-5 h-5 text-gray-500"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            আমার প্রোফাইল
                        </Link>

                        <button
                            onClick={handleSignOut}
                            className="w-full flex items-center gap-3 text-red-500 hover:text-red-600 transition-colors text-sm font-medium pt-1 cursor-pointer"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                />
                            </svg>
                            সাইন আউট
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserMenu;