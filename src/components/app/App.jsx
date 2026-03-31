import { Outlet } from "react-router";
import Navbar from "../navbar/Navbar";
import styles from "./App.module.css";

const App = () => {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.container}>
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default App;
