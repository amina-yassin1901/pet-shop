import styles from "./styles.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slices/productsSlice/productsSlice";
import CardProduct from "../cardProduct/index";
function SaleList() {
  const dispatch = useDispatch();

  const { items, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts({ mode: "all" }));
  }, [dispatch]);
  const discountedItems = items
    .filter((item) => item.discont_price && item.discont_price < item.price)
    .slice(0, 4);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.fullTitle}>
          <h3 className={styles.title}>Sale</h3>
          <div className={styles.lineLink}>
            <span className={styles.line}></span>
            <a className={styles.link} href="/products/sale">
              All sales
            </a>
          </div>
        </div>
        <ul className={styles.list}>
          {discountedItems.map((item) => (
            <CardProduct key={item.id} item={item} />
          ))}
        </ul>
      </div>
    </section>
  );
}
export default SaleList;
