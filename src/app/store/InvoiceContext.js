'use client';
import { createContext, useEffect, useState } from "react";

export const InvoiceContext = createContext();

export function InvoiceProvider({ children }) {
    const now = new Date("12 September 2024");

    const [invoice, setInvoice] = useState({
        myInfo: {
            name: null,
            address: null,
            contact: null
        },
        clientInfo: {
            name: "",
            address: "",
            contact: ""
        },
        details: {
            type: "",
            name: "",
            date: `${now.getFullYear()}-${(now.getMonth() < 9 ? "0" : "") + (now.getMonth() + 1)}-${now.getDate()}`
        },
        items: []
    });

    useEffect(() => {
        const newInfo = {
            name: localStorage.getItem("my-name") || "",
            address: localStorage.getItem("my-address") || "",
            contact: localStorage.getItem("my-contact") || ""
        };

        const stored = localStorage.getItem('current');
        let newItems = [];
        if (stored) {
            newItems = JSON.parse(stored);
        }

        console.log(newItems, stored)

        setInvoice((old) => (
            { ...old, myInfo: newInfo, items: newItems })
        );
    }, [setInvoice]);

    return <InvoiceContext.Provider value={{ invoice, setInvoice }} >
        {children}
    </ InvoiceContext.Provider>
}