'use client';
import { createContext, useEffect, useState } from "react";

export const InvoiceContext = createContext();

export function InvoiceProvider({ children }) {
    const now = new Date("12 September 2024");

    const [invoice, setInvoice] = useState({
        myInfo: {
            name: null,
            address: null,
            contact: null,
            iban: null,
            bic: null
        },
        clientInfo: {
            name: "",
            address: "",
            contact: ""
        },
        details: {
            type: "Facture",
            name: "",
            date: `${now.getFullYear()}-${(now.getMonth() < 9 ? "0" : "") + (now.getMonth() + 1)}-${now.getDate()}`
        },
        legal: `Payable en 1 fois, dans un délai de 5 jours ouvrés à compter de la date indiquée en haut du  présent document.
Tout retard de paiement entraîne une pénalité de 15% par jour, ainsi qu'une indemnité forfaitaire pour frais de recouvrement de 40 euros, conformément aux articles L441-10 et D441-5 du Code du Commerce.
TVA non applicable, article 293 B du Code Générale des Impôts.`,
        items: []
    });

    useEffect(() => {
        const myInfo = {
            name: localStorage.getItem("my-name") || "",
            address: localStorage.getItem("my-address") || "",
            contact: localStorage.getItem("my-contact") || "",
            iban: localStorage.getItem("my-iban") || "",
            bic: localStorage.getItem("my-bic") || ""
        };
        const clientInfo = {
            name: localStorage.getItem("client-name") || "",
            address: localStorage.getItem("client-address") || "",
            contact: localStorage.getItem("client-contact") || ""
        };
        const details = {
            name: localStorage.getItem("invoice-name") || "",
            type: localStorage.getItem("invoice-type") || "",
            date: localStorage.getItem("invoice-date") || ""
        };

        const stored = localStorage.getItem('current');
        let newItems = [];
        if (stored) {
            newItems = JSON.parse(stored);
        }

        setInvoice((old) => (
            {
                ...old,
                myInfo,
                clientInfo,
                details,
                items: newItems
            })
        );
    }, [setInvoice]);

    return <InvoiceContext.Provider value={{ invoice, setInvoice }} >
        {children}
    </ InvoiceContext.Provider>
}