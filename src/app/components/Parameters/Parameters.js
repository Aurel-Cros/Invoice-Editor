'use client'

import { useContext, useState } from 'react'

import theme from '@/app/theme.module.scss'
import style from './Parameters.module.scss'
import { InvoiceContext } from '@/app/store/InvoiceContext'

export default function Parameters() {

    const { invoice, setInvoice } = useContext(InvoiceContext);

    function saveMyInfo(e) {

        localStorage.setItem("my-" + e.target.name, e.target.value)
        setInvoice((old) => {
            const newInvoice = { ...old };
            newInvoice.myInfo[e.target.name] = e.target.value;
            return newInvoice;
        });
    }

    function saveClientInfo(e) {
        setInvoice((old) => {
            const newInvoice = { ...old };
            newInvoice.clientInfo[e.target.name] = e.target.value;
            return newInvoice;
        });
    }

    function saveInvoiceDetails(e) {
        setInvoice((old) => {
            const newInvoice = { ...old };
            newInvoice.details[e.target.name] = e.target.value;
            return newInvoice;
        });
    }

    const [show, setShow] = useState(false);

    return show ?
        <div className={style.params}>
            <div className={style.formFlex}>
                <h3>Vous</h3>
                <label>
                    Nom : <input onInput={saveMyInfo} name="name" type="text" value={invoice.myInfo.name}></input>
                </label>
                <label>
                    Adresse : <textarea onInput={saveMyInfo} name="address" rows="4" value={invoice.myInfo.address}></textarea>
                </label>
                <label>
                    Contact, SIRET, etc. : <textarea onInput={saveMyInfo} name="contact" rows="4" value={invoice.myInfo.contact}></textarea>
                </label>
            </div>
            <hr className={theme.margin}></hr>
            <div className={style.formFlex}>
                <h3>Votre client</h3>
                <label>
                    Nom : <input onInput={saveClientInfo} name="name" type="text" value={invoice.clientInfo.name}></input>
                </label>
                <label>
                    Adresse : <textarea onInput={saveClientInfo} name="address" rows="4" value={invoice.clientInfo.address}></textarea>
                </label>
                <label>
                    Contact, SIRET, etc. : <textarea onInput={saveClientInfo} name="contact" rows="4" type="text" value={invoice.clientInfo.contact}></textarea>
                </label>
            </div>
            <hr className={theme.margin}></hr>
            <div className={style.formFlex}>
                <h3>Document</h3>
                <label>
                    Type : <select onChange={saveInvoiceDetails} value={invoice.details.type} name="type">
                        <option>Devis</option>
                        <option>Facture</option>
                    </select>
                </label>
                <label>
                    Nom : <input onInput={saveInvoiceDetails} value={invoice.details.name} name="name" type="text"></input>
                </label>
                <label>
                    Date : <input onInput={saveInvoiceDetails} value={invoice.details.date} name="date" type="date"></input>
                </label>
            </div>
            <button onClick={() => { setShow(false) }}>Fermer</button>
        </div>
        :
        <button onClick={() => { setShow(true) }}>Paramètres</button>

}