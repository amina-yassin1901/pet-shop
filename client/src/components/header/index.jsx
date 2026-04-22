import styles from "./styles.module.css";
import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/icons/logo.svg";
import Badge from "@mui/material/Badge";
import cartIcon from "../../assets/icons/cart.svg";
import { useSelector } from "react-redux";

const links = [
  { name: "Main Page", path: "/" },
  { name: "Categories", path: "/categories" },
  { name: "All products", path: "/products" },
  { name: "All sales", path: "/products/sale" },
];

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce((acc, item) => acc + item.count, 0);
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
        <Link to="/cart" className={styles.cartLink}>
          <Badge
            badgeContent={totalItems}
            showZero={false}
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor: " #0d50ff",
                color: "white",
                fontSize: "12px",
                fontWeight: "600",
                width: "26px",
                height: "26px",
                borderRadius: "50%",
                top: "16px",
                left: "-15px",
              },
            }}
          >
            <img
              src={cartIcon}
              alt="cart"
              style={{ width: "48px", height: "48px" }}
            />
          </Badge>
        </Link>
      </div>
    </header>
  );
}

export default Header;
