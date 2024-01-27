'use client'

import theme from "@/app/theme.module.scss";
import style from "./InvoiceList.module.scss";
import ItemRow from "../ItemRow/ItemRow";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import Link from "next/link";
import downloadObjectAsJson from "@/app/utils/downloadObjectAsJson";

export default function InvoiceList() {
    const [items, setItems] = useState([]);

    const updateItems = (value) => {
        setItems(() => value)
        localStorage.setItem('current', JSON.stringify(value));
    }

    useEffect(() => {
        const stored = localStorage.getItem('current');

        if (stored) {
            const newState = JSON.parse(stored);
            if (stored.length > 0)
                setItems(newState);
        }

    }, [setItems]);

    const addItem = () => {
        const newItems = [...items, {
            id: nanoid(),
            name: "",
            text: "",
            price: 0,
            quantity: 0
        }];
        updateItems(newItems);
    }
    const removeItem = (item) => {
        const newItems = items.filter(i => item.id != i.id);
        updateItems(newItems);
    }
    const editItem = (item) => {
        const newItems = items.map(i => {
            if (i.id != item.id)
                return i;
            return item;
        });
        updateItems(newItems);
    }

    return (
        <div className={theme.flex}>
            <div className={style.invoiceList}>
                {items.map(item => <ItemRow key={item.id} item={item} editItem={editItem} removeItem={removeItem}></ItemRow>)}
            </div>
            <button onClick={addItem}>Ajouter</button>
            <div>
                <h4>Total</h4>
                <p>{items.reduce((a, i) => a + i.price * i.quantity, 0)}€</p>
            </div>
            <button onClick={() => {
                downloadObjectAsJson(items,
                    "facture-" + new Date().toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    }).replaceAll(' ', '-'))
            }}>Exporter en JSON</button>

        </div >
    )
}