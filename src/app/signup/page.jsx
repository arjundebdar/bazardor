"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signUp, signIn } from "@/lib/auth-client";
import toast from "react-hot-toast"; // or "sonner"

export default function RegisterPage() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [loading, setLoading] = useState(false);
    const [socialLoading, setSocialLoading] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errorMsg) setErrorMsg("");
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            const msg = "Please fill in all fields.";
            setErrorMsg(msg);
            toast.error(msg);
            return;
        }

        if (formData.password.length < 6) {
            const msg = "পাসওয়ার্ড অবশ্যই ৬ সংখ্যার উপরে হতে হবে।.";
            setErrorMsg(msg);
            toast.error(msg);
            return;
        }

        // Password Recheck Validation
        if (formData.password !== formData.confirmPassword) {
            const msg = "পাসওয়ার্ড মিলে নি!";
            setErrorMsg(msg);
            toast.error(msg);
            return;
        }

        setLoading(true);
        setErrorMsg("");

        try {
            const { error } = await signUp.email({
                name: formData.name,
                email: formData.email,
                password: formData.password,
            });

            if (error) {
                const errorText = error.message || "রেজিষ্ট্রেশন ফেইল. আবার চেষ্টা করুন.";
                setErrorMsg(errorText);
                toast.error(errorText);
            } else {
                toast.success("রেজিষ্ট্রেশন সফল হয়েছে! লগইন করুন....");
                router.push("/signin");
            }
        } catch (err) {
            const fallbackMsg = err?.message || "An unexpected error occurred.";
            setErrorMsg(fallbackMsg);
            toast.error(fallbackMsg);
        } finally {
            setLoading(false);
        }
    };

    const handleSocialLogin = async (provider) => {
        setSocialLoading(provider);
        try {
            await signIn.social({
                provider,
                callbackURL: "/", // Redirect to Home Page on social login success
            });
            toast.success(`Redirecting to ${provider}...`);
        } catch (err) {
            toast.error(`Failed to connect with ${provider}`);
            setSocialLoading(null);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md border border-gray-100">
                <div>
                    <h2 className="text-center text-3xl font-extrabold text-gray-900 border-b border-dotted">
                        Create an Account
                    </h2>
                </div>

                {/* Display Error Message inside form if present */}
                {errorMsg && (
                    <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 rounded text-sm">
                        {errorMsg}
                    </div>
                )}

                <form className="mt-8 space-y-5" onSubmit={handleRegister}>
                    {/* Name Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter Your Name"
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Email Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter Your Email"
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Confirm Password Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            required
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm Password"
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Submit / Register Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
                    >
                        {loading ? (
                            <span className="flex items-center gap-2">
                                {/* Skeleton Loader / Spinner */}
                                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                </svg>
                                Create an Account...
                            </span>
                        ) : (
                            "Register"
                        )}
                    </button>
                </form>

                {/* Divider */}
                <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Or continue with</span>
                    </div>
                </div>

                {/* Social Login Buttons */}
                <div className="grid grid-cols-2 gap-3">
                    {/* Google Login */}
                    <button
                        type="button"
                        onClick={() => handleSocialLogin("google")}
                        disabled={socialLoading !== null}
                        className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                    >
                        {socialLoading === "google" ? (
                            <span className="animate-pulse">Connecting...</span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <svg className="w-4 h-4" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                                </svg>
                                Google
                            </span>
                        )}
                    </button>

                    {/* GitHub Login */}
                    <button
                        type="button"
                        onClick={() => handleSocialLogin("github")}
                        disabled={socialLoading !== null}
                        className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                    >
                        {socialLoading === "github" ? (
                            <span className="animate-pulse">Connecting...</span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                                </svg>
                                GitHub
                            </span>
                        )}
                    </button>
                </div>

                {/* Link to Login */}
                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link
                        href="/signin"
                        className="font-medium text-blue-600 hover:text-blue-500 hover:underline"
                    >
                        সাইন ইন
                    </Link>
                </p>
            </div>
        </div>
    );
}