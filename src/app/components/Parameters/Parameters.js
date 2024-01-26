'use client'

import { useEffect, useState } from 'react'

import theme from '../theme.module.scss'
import style from './Parameters.module.scss'

export default function Parameters() {
    const [info, setInfo] = useState({});

    useEffect(() => {
        const newInfo = {
            name: localStorage.getItem("name") || "",
            address: localStorage.getItem("address") || "",
            contact: localStorage.getItem("contact") || ""
        };
        setInfo(newInfo);
    }, []);

    function saveInfo(e) {

        localStorage.setItem(e.target.id, e.target.value);
        const newInfo = {
            ...info
        }
        newInfo[e.target.id] = e.target.value;
        setInfo(newInfo);
    }

    const [show, setShow] = useState(false);

    return show ?
        <div className={style.params}>
            <div className={style.formFlex}>
                <h3>Vous</h3>
                <label>
                    Nom : <input onInput={saveInfo} id="name" type="text" value={info.name}></input>
                </label>
                <label>
                    Adresse : <textarea onInput={saveInfo} id="address" rows="6" value={info.address}></textarea>
                </label>
                <label>
                    Contact, SIRET, etc. : <textarea onInput={saveInfo} id="contact" rows="2" value={info.contact}></textarea>
                </label>
            </div>
            <hr className={theme.margin}></hr>
            <div className={style.formFlex}>
                <h3>Votre client</h3>
                <label>
                    Nom : <input type="text"></input>
                </label>
                <label>
                    Adresse : <textarea rows="6"></textarea>
                </label>
                <label>
                    Contact, SIRET, etc. : <input type="text"></input>
                </label>
            </div>
            <button onClick={() => { setShow(false) }}>Fermer</button>
        </div>
        :
        <button onClick={() => { setShow(true) }}>Paramètres</button>

}