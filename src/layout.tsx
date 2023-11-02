import Navbar from "./components/Navbar";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Layout({ children }: any) {
  return (
    <div className={`${inter.className}`}>
      <Navbar />
      
      <main className="container">{children}</main>
    </div>
  );
}
