import { Outlet } from "react-router-dom";
import styles from "./styles.module.css";
import Header from "../components/header";
import Footer from "../components/footer/index";
function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
export default Layout;
