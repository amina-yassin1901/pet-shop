import styles from "./styles.module.css";
import { API_URL } from "../../contacts/api";
import { Link } from "react-router-dom";
import AddBtn from "../addBtn/index";

function CardProduct({ item }) {
  const getDiscountPercent = (price, discountPrice) => {
    return Math.round(((price - discountPrice) / price) * 100);
  };
  return (
    <>
      <li key={item.id} className={styles.item}>
        <Link to={`/products/${item.id}`}>
          <div className={styles.imageWrapper}>
            {item.discont_price && (
              <div className={styles.badge}>
                -{getDiscountPercent(item.price, item.discont_price)}%
              </div>
            )}
            <img
              className={styles.img}
              src={`${API_URL}${item.image}`}
              alt={item.title}
            />
            <div className={styles.btnPosition}>
              <AddBtn product={item} />
            </div>
          </div>

          <div className={styles.content}>
            <p className={styles.itemTitle}>{item.title}</p>
            <div className={styles.price}>
              {item.discont_price ? (
                <>
                  <span className={styles.newPrice}>${item.discont_price}</span>
                  <span className={styles.oldPrice}>${item.price}</span>
                </>
              ) : (
                <span className={styles.priceOnly}>${item.price}</span>
              )}
            </div>
          </div>
        </Link>
      </li>
    </>
  );
}
export default CardProduct;
