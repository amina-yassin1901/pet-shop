import styles from "./styles.module.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/icons/logo.svg";
import cart from "../../assets/icons/cart.svg";

const links = [
  { name: "Main Page", path: "/" },
  { name: "Categories", path: "/categories" },
  { name: "All products", path: "/products" },
  { name: "All sales", path: "/sales" },
];

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a href="/">
          <img width={70} height={70} src={logo} alt="logo" />
        </a>

        <div
          className={`${styles.burger} ${isOpen ? styles.open : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`${styles.list} ${isOpen ? styles.menuOpen : ""}`}>
          {links.map((link) => (
            <li className={styles.item} key={link.path}>
              <NavLink
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
        <a href="/cart">
          <img width={48} height={48} src={cart} alt="cart" />
        </a>
      </div>
    </header>
  );
}

export default Header;
