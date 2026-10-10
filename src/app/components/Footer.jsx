import React from "react";

const Footer = () => {
    return (
        <footer className="mt-10 border-t border-gray-200">
            <div className="max-w-7xl mx-auto md:px-8 w-[90%] px-4 py-5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">

                <p>
                    বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
                </p>

                <p className="text-center md:text-right">
                    সকল দাম সম্ভাব্য; বাজার পরিস্থিতির উপর নির্ভর করে
                    পরিবর্তিত হতে পারে।
                </p>

            </div>
        </footer>
    );
};

export default Footer;

