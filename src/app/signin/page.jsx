"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errorMsg, setErrorMsg] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMsg("");

        try {
            const { error } = await signIn.email({
                email: formData.email,
                password: formData.password,
            });

            if (error) {
                toast.error("ইউজার বা পাসওয়ার্ড সঠিক নয়!");
            } else {
                toast.success("সাইন ইন সফল হয়েছে!");
                router.push("/"); // Navigate to home
            }
        } catch (err) {
            toast.error(err?.message || "লগইন ফেইল");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md border border-gray-100">
                <h2 className="text-center text-3xl font-extrabold border-b border-dotted text-gray-900">
                    সাইন ইন
                </h2>

                {errorMsg && (
                    <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 rounded text-sm">
                        {errorMsg}
                    </div>
                )}

                <form className="mt-8 space-y-5" onSubmit={handleLogin}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="mt-1 w-full px-3 py-2 border rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            required
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="mt-1 w-full px-3 py-2 border rounded-md"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2.5 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 disabled:opacity-50"
                    >
                        সাইন ইন
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-600">
                    do not have an account?{" "}
                    <Link href="/signup" className="text-blue-600 hover:underline">
                        সাইন আপ
                    </Link>
                </p>
            </div>
        </div>
    );
}