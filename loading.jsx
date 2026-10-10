
export default function GlobalLoading() {
    return (
        <div className="min-h-screen bg-[#f4f7f4] py-8 px-4 flex flex-col justify-center items-center">
            <div className="max-w-4xl w-full space-y-6">
                {/* Navbar / Header Skeleton */}
                <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-200 rounded-xl animate-pulse" />
                        <div className="space-y-2">
                            <div className="h-5 w-28 bg-gray-200 rounded animate-pulse" />
                            <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <div className="h-10 w-24 bg-gray-200 rounded-xl animate-pulse" />
                        <div className="h-10 w-24 bg-gray-200 rounded-xl animate-pulse" />
                    </div>
                </div>

                {/* Hero / Banner Skeleton */}
                <div className="w-full h-48 bg-gray-200 rounded-2xl animate-pulse" />

                {/* Grid Content Cards Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div
                            key={item}
                            className="bg-white p-5 rounded-2xl border border-gray-100 space-y-4 shadow-sm"
                        >
                            <div className="h-32 w-full bg-gray-200 rounded-xl animate-pulse" />
                            <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse" />
                            <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}