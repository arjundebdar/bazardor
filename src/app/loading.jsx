export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 space-y-6 animate-pulse">
            {/* হেডার বা টাইটেলের স্কেলিটন */}
            <div className="h-8 bg-gray-300 rounded w-1/3"></div>

            {/* কার্ড বা গ্রিড এলাকার স্কেলিটন */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
                <div className="h-40 bg-gray-300 rounded-lg"></div>
                <div className="h-40 bg-gray-300 rounded-lg"></div>
                <div className="h-40 bg-gray-300 rounded-lg"></div>
            </div>

            {/* নিচের লিস্ট বা টেবিলের স্কেলিটন */}
            <div className="w-full max-w-4xl space-y-3 pt-4">
                <div className="h-12 bg-gray-300 rounded"></div>
                <div className="h-12 bg-gray-300 rounded"></div>
            </div>
        </div>
    );
}