import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.css";
import "./globals.css";
import BootstrapClient from "./components/BootstrapClient";
import { LinkProvider } from "./context/LinkContext";
import { AuthProvider } from "./context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Link Sharing App",
  description: "Create and share your social links!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <AuthProvider>
        <LinkProvider>
          <body
            className={`${inter.className}`}
            style={{ backgroundColor: "#FAFAFA" }}
          >
            {children}
            <BootstrapClient />
          </body>
        </LinkProvider>
      </AuthProvider>
    </html>
  );
}
