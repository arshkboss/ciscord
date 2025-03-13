import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { ModalProvider } from "@/components/providers/modal-provider";

const font = Open_Sans({ subsets: ["latin"] });

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Ciscord",
  description: "Ciscord reborn",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className}  antialiased`}>
        <div className="flex ">
          <ModalProvider />
          {children}
        </div>
      </body>
    </html>
  );
}
