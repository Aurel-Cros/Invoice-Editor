import theme from "./ItemRow.module.scss";

export default function ItemRow({ item, editItem, removeItem }) {
    const itemTotal = item.price * item.quantity;

    function edit(e) {
        const newItem = { ...item };
        newItem[e.target.name] = e.target.value;

        editItem(newItem);
    }

    return (
        <div className={theme.itemRow}>
            <div className={theme.name}>
                <input name="name" autoComplete="off" onInput={edit} placeholder="Nom de l'item" defaultValue={item.name}></input>
                <textarea name="text" onInput={edit} placeholder="Description" defaultValue={item.text}></textarea>
            </div>
            <div className={theme.price}>
                <label>Prix unit
                    <input type="number" name="price" onInput={edit} placeholder="Prix unit" defaultValue={item.price}></input>
                </label>
            </div>
            <div className={theme.q}>
                <label>Quantité
                    <input type="number" name="quantity" onInput={edit} placeholder="Quantité" defaultValue={item.quantity}></input>
                </label>
            </div>
            <div className={theme.tot}>
                <p>Total item</p>
                <p>{itemTotal}</p>
            </div>
            <div className={theme.close}>
                <button className="closeBtn" onClick={() => { removeItem(item) }}>X</button>
            </div>
        </div>
    )
}