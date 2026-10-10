import Image from "next/image";
import Herosection from "./components/Herosection";
import ProductCard from "./components/ProductCard";

export default function Home() {
  return (
    <div>
      <Herosection />
      <ProductCard />
    </div >
  );
}
