import { Inter } from "next/font/google";
import "./globals.scss";
import { InvoiceProvider } from "./store/InvoiceContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mon super facturier avec Next.js",
  description: "Pour créer des factures avec une interface vraiment sympa !",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <InvoiceProvider>
          {children}
        </InvoiceProvider>
      </body>
    </html>
  );
}