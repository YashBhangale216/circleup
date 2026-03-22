import "./globals.css";
// @ts-ignore
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "CircleUp",
  description: "Community platform",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0d0d0d] text-white">
        
          <Navbar />
          {children}
        
      </body>
    </html>
  );
}