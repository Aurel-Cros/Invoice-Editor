import theme from "ItemRow.module.scss";

export default function ItemRow({ item, editItem }) {
    const itemTotal = item.price * item.quantity;

    function edit(e) {
        const newItem = { ...item };
        newItem[e.target.name] = e.target.value;

        editItem(newItem);
    }

    return (
        <div className={theme.itemRow}>
            <div className={theme.name}>
                <input name="name" onInput={edit} placeholder="Nom de l'item" defaultValue={item.name}></input>
                <textarea name="text" onInput={edit} placeholder="Description" defaultValue={item.text}></textarea>
            </div>
            <div className={theme.price}>
                <input name="price" onInput={edit} placeholder="Prix unitaire" defaultValue={item.price}></input>
            </div>
            <div className={theme.q}>
                <input name="quantity" onInput={edit} placeholder="Quantité" defaultValue={item.quantity}></input>
            </div>
            <div className={theme.tot}>
                <p>{itemTotal}</p>
            </div>
        </div>
    )
}