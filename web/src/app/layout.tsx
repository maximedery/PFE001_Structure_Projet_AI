import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MainNav } from "@/components/main-nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Civalgo AI",
  description: "Optimization of schedule for the construction sector.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col">
          <div className="border-b">
            <div className="flex items-center px-2">
              <MainNav />
            </div>
          </div>
          <main>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
