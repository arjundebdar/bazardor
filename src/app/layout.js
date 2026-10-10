import { Tiro_Bangla } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
const tiroBangla = Tiro_Bangla({
  subsets: ["bengali", "latin"],
  weight: ["400"],
});



export default function RootLayout({ children }) {
  return (
    <html
      lang="bn"
      className={tiroBangla.className}
    >
      <body>
        <div>
          <Toaster position="top-right" />
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
