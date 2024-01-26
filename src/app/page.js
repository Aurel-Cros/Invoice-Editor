import styles from "./page.module.css";
import theme from "./theme.module.scss";
import Parameters from "./components/Parameters/Parameters";
import InvoiceList from "./components/InvoiceList/InvoiceList";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={theme.smcp}>Mon super éditeur de facture</h1>
      <h2>Éléments facturés</h2>
      <div className={theme.w100}>
        <InvoiceList></InvoiceList>
      </div>
      <Parameters></Parameters>
    </main>
  );
}
