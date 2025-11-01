import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Web3Modal } from "@/context/Web3Modal";
import { headers } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Base Builder Vault - Web3 dApp",
  description: "Production-ready dApp on Base chain with WalletConnect integration for the Base Builder program",
  keywords: ["Base", "WalletConnect", "Web3", "dApp", "Ethereum", "NFT"],
  authors: [{ name: "Base Builder" }],
  openGraph: {
    title: "Base Builder Vault",
    description: "Production-ready dApp on Base chain",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Await headers to make layout dynamic
  await headers();

  return (
    <html lang="en">
      <body className={inter.className}>
        <Web3Modal>{children}</Web3Modal>
      </body>
    </html>
  );
}
