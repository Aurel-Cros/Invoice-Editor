'use client'

import { useEffect, useState } from "react"
import theme from "@/app/theme.module.scss";
import style from "InvoiceList.module.scss";
import ItemRow from "../ItemRow/ItemRow";
import { nanoid } from "nanoid";
import useLocalStorage from "../../Hooks/useLocalStorage";

export default function InvoiceList() {
    const [value, setValue] = useLocalStorage("current", [])
    const [items, setItems] = useState(value || []);

    useEffect(() => {
        setValue(items)
    }, [items, setValue]);


    const addItem = () => {
        const newItems = [...items, {
            id: nanoid(),
            name: "",
            text: "",
            price: "",
            quantity: ""
        }];
        setItems(newItems);
    }
    const removeItem = (item) => {
        const newItems = items.filter(i => item.id != i.id);
        setItems(newItems);
    }
    const editItem = (item) => {
        const newItems = items.map(i => {
            if (i.id != item.id)
                return i;
            return item;
        });
        setItems(newItems);
    }

    return (
        <div className={theme.flex}>
            <div className={style.invoiceList}>
                {items.map(item => <ItemRow key={item.id} item={item} editItem={editItem}></ItemRow>)}
            </div>
            <button onClick={addItem}>Ajouter</button>
        </div >
    )
}