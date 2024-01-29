'use client';
import theme from "@/app/theme.module.scss";
import Parameters from "./components/Parameters/Parameters";
import InvoiceList from "./components/InvoiceList/InvoiceList";
import { InvoiceContext } from "./store/InvoiceContext";
import { useContext } from "react";
import Link from "next/link";

export default function Home() {
  const { invoice } = useContext(InvoiceContext)

  return (
    <main className={theme.main}>
      <h1 className={theme.smcp}>Mon super éditeur de facture</h1>
      <h2>Éléments facturés</h2>
      <div className={theme.w100}>
        <InvoiceList></InvoiceList>
      </div>
      <Parameters></Parameters>

      <button><Link href='./invoice'>Voir le document</Link></button>

      <button onClick={() => {
        downloadObjectAsJson(invoice,
          "facture-" + new Date().toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }).replaceAll(' ', '-'))
      }}>Exporter en JSON</button>
    </main>
  );
}
