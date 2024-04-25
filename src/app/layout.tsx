import type {Metadata} from "next";
import {Inter} from "next/font/google";
import {Header} from "@/app/header";
import "./globals.css";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "File hoster",
    description: "Host your files",
    icons: "",
};

export default function RootLayout(
    {children}: Readonly<{ children: React.ReactNode; }>
) {
    return (
        <html lang="en">
        <body className={inter.className}>
            <Header/>
            {children}
        </body>
        </html>
    );
}
