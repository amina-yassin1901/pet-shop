import { Outlet } from "react-router-dom";
import styles from "./styles.module.css";
import Header from "../components/header";
import Footer from "../components/footer/index";
function Layout() {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
export default Layout;
