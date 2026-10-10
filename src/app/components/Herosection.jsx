import Image from "next/image";
import Link from "next/link";


const date = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
});

const Herosection = () => {
    return (
        <section className="max-w-7xl mx-auto px-4 md:px-8 w-[90%] mt-10">
            <div className="p-5 sm:p-8 md:p-10 rounded-2xl px-5 sm:px-8 md:px-10 mt-5 flex flex-col-reverse md:flex-row justify-between items-center gap-8 shadow bg-white">
                <div className="flex flex-col w-full md:w-1/2">
                    <div className="flex">
                        <p className="text-sm sm:text-base md:text-lg font-bold bg-green-100 text-green-500 px-3 sm:px-4 py-1 rounded-full">{date}</p><br />
                    </div>
                    <h1 className="ext-2xl sm:text-3xl md:text-[45px] font-extrabold mb-3 sm:mb-5 mt-4 leading-tight">
                        আজকের বাজার দর এক নজরে
                    </h1>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
                    </p>
                    <div>
                        <Link href={'#products'} className="btn btn-active btn-success text-white mt-6 sm:mt-8 shadow text-sm sm:text-[16px] ">
                            সব পণ্য দেখুন
                        </Link>
                    </div>
                </div>
                <div>
                    <Image
                        src={"/bazar-hero.png"}
                        alt="Banner Image"
                        width={500}
                        height={500}
                    />
                </div>
            </div>
        </section>
    );
}
export default Herosection;