'use client';
import { Fragment, useContext } from 'react';
import style from './invoice.module.scss';
import { InvoiceContext } from '../store/InvoiceContext';

export default function InvoiceDocument() {

    const { invoice } = useContext(InvoiceContext);

    const date = new Date(invoice.details.date);

    return <div id={style.exportedDocument}>
        <div id={style.top}>
            <div>
                <h2>{invoice.details.type.toUpperCase()} {invoice.details.name}</h2>
            </div>
            <h3 id={style.docuDate}>{date.toLocaleDateString()}</h3>
            <div id={style.parties}>
                <div id={style.infosEI}>
                    <p>{invoice.myInfo.name}</p>
                    <pre>{invoice.myInfo.address}</pre>
                    <pre>{invoice.myInfo.contact}</pre>
                </div>
                <div id={style.client}>
                    <p>{invoice.clientInfo.name}</p>
                    <pre>{invoice.clientInfo.address}</pre>
                    <pre>{invoice.clientInfo.contact}</pre>
                </div>
            </div>
        </div>
        <div id={style.items}>
            <div className={style.thead}>
                <div className={style.row}>
                    <div className={style.header}>Description</div>
                    <div className={style.header}>Quantité</div>
                    <div className={style.header}>Prix HT</div>
                </div>
            </div>
            <div id={style.tbody}>
                {invoice.items.map(item =>
                    <div className={style.row} key={item.id}>
                        <div className={style.itemDescription}>
                            <h5>{item.name}</h5>
                            <p className={style.descriptionItem}>{item.text}</p>
                        </div>
                        <div className={style.center}>{item.quantity}</div>
                        <div className={style.center}>{item.price * item.quantity} €</div>
                    </div>
                )}
            </div>
        </div>
        <div className={style.tfoot}>
            <div className={`${style.row} ${style.totalFrame}`}>
                <div className={style.flex3}>Net à payer</div>
                <div id={style.totTTC}>{invoice.items.reduce((acc, item) => acc + item.price * item.quantity, 0)} €</div>
            </div>
        </div>
        {invoice.details.legalDisplay && <div id={style.clauses}>
            <p>
                {invoice.details.legal.split(/(?:\r\n|\n\r|\r|\n)/g).map((a, i) => <Fragment key={i}>{a}<br /></Fragment>)}
            </p>
            <p>
                IBAN : {invoice.myInfo.iban}<br />
                BIC : {invoice.myInfo.bic}
            </p>
        </div>}
    </div>
}