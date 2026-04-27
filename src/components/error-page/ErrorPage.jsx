import styles from "./ErrorPage.module.css";
import alertIconUrl from "../../assets/icons/alert-rhombus.svg";
import { Link } from "react-router";

export default function ErrorPage({ errorTitle, errorMessage }) {
  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <img src={alertIconUrl} alt="Erorr alert!" />
        <h1>{errorTitle}</h1>
        <p>{errorMessage}</p>
        <Link to="/" className={styles.link}>
          Back to Homepage
        </Link>
      </section>
    </div>
  );
}
