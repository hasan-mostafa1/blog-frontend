import styles from "./ErrorPage.module.css";
import alertIconUrl from "../../assets/icons/alert-rhombus.svg";
import { Link, useRouteError } from "react-router";

export default function ErrorPage() {
  const error = useRouteError();
  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <img src={alertIconUrl} alt="Erorr alert!" />
        <h1>
          {error.status}:{error.statusText}
        </h1>
        <p>{error.data}</p>
        <Link to="/" className={styles.link}>
          Back to Homepage
        </Link>
      </section>
    </div>
  );
}
