import styles from "./styles.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/slices/categoriesSlice/categoriesSlice";
import { Link } from "react-router-dom";
function CategoriesList() {
  const dispatch = useDispatch();

  const { categories, loading, error } = useSelector(
    (state) => state.categories,
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.fullTitle}>
          <h3 className={styles.title}>Categories</h3>
          <div className={styles.lineLink}>
            <span className={styles.line}></span>
            <a className={styles.link} href="/categories">
              All categories{" "}
            </a>
          </div>
        </div>
        <ul className={styles.list}>
          {categories.slice(0, 4).map((category) => (
            <li key={category.title} className={styles.item}>
              <Link to={`/categories/${category.id}`}>
                <img
                  className={styles.img}
                  src={`http://localhost:3333${category.image}`}
                  alt={category.title}
                />
                <p className={styles.itemTitle}>{category.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
export default CategoriesList;
