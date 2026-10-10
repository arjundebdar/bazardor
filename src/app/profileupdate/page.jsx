"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, authClient, signOut } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function ProfilePage() {
    const router = useRouter();
    const { data: session, isPending } = useSession();
    const [name, setName] = useState("");

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!name.trim()) {
            toast.error("অনুগ্রহ করে একটি সঠিক নাম লিখুন");
            return;
        }



        try {
            const { error } = await authClient.updateUser({
                name: name.trim(),
            });

            if (error) {
                toast.error(error.message || "তথ্য আপডেট করা সম্ভব হয়নি");
            } else {
                toast.success("তথ্য সফলভাবে আপডেট করা হয়েছে!");
                router.refresh(); // UI তে নতুন নাম সাথে সাথে রিফ্রেশ করার জন্য
            }
        } catch (err) {
            toast.error("একটি সমস্যা দেখা দিয়েছে, পুনরায় চেষ্টা করুন");
        }
    };


    // সাইন আউট হ্যান্ডলার
    const handleSignOut = async () => {
        try {
            await signOut();
            toast.success("সাইন আউট সফল হয়েছে!");
            router.push("/"); // সাইন আউট শেষে হোম পেজে পাঠাতে
        } catch (error) {
            toast.error("সাইন আউট ব্যর্থ হয়েছে");
        }
    };

    // Skeleton Loading State
    if (isPending) {
        return (
            <div className="min-h-screen bg-[#f4f7f4] py-12 px-4 flex justify-center">
                <div className="max-w-3xl w-full space-y-6">
                    <div className="space-y-2">
                        <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse" />
                        <div className="h-4 w-64 bg-gray-200 rounded-lg animate-pulse" />
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-row items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-2xl bg-gray-200 animate-pulse" />
                            <div className="space-y-2">
                                <div className="h-6 w-36 bg-gray-200 rounded animate-pulse" />
                                <div className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
                            </div>
                        </div>
                        <div className="h-10 w-28 bg-gray-200 rounded-xl animate-pulse" />
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6">
                        <div className="h-6 w-16 bg-gray-200 rounded animate-pulse" />
                        <div className="space-y-4">
                            <div className="h-12 w-full bg-gray-100 rounded-xl animate-pulse" />
                            <div className="h-12 w-full bg-gray-200 rounded-xl animate-pulse" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!session) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#f4f7f4] gap-4">
                <p className="text-gray-600">প্রোফাইল দেখতে অনুগ্রহ করে সাইন ইন করুন</p>
                <Link href="/signin" className="btn btn-emerald text-white bg-emerald-600 px-4 py-2 rounded-lg hover:bg-emerald-700 transition">
                    সাইন ইন
                </Link>
            </div>
        );
    }

    const user = session.user;

    return (
        <div className="min-h-screen bg-[#f4f7f4] py-12 px-4 flex justify-center">
            <div className="max-w-3xl w-full space-y-6">

                {/* হেডার সেকশন */}
                <div>
                    <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
                        আমার প্রোফাইল
                    </h1>
                    <p className="text-gray-600 text-sm mt-1">
                        আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
                    </p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-row items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden relative border border-gray-200">
                            <Image
                                src={user.image || "/default-avatar.png"}
                                alt={user.name || "User Avatar"}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                            <p className="text-gray-500 text-sm">{user.email}</p>
                        </div>
                    </div>

                    <button
                        onClick={handleSignOut}
                        className="flex items-center gap-2 border border-red-400 text-red-500 hover:bg-red-50 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
                    >
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M11 17l-5-5m0 0l5-5m-5 5h12"
                            />
                        </svg>
                        সাইন আউট
                    </button>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6">
                    <h3 className="text-lg font-bold text-gray-900">তথ্য</h3>

                    <form onSubmit={handleUpdate} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                নাম
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="আপনার নাম লিখুন"
                                className="w-full px-4 py-3 bg-[#f8faf8] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-800"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#048848] hover:bg-[#03703b] text-white font-medium py-3 px-4 rounded-xl shadow-sm transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            আপডেট
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}