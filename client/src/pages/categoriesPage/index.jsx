import styles from "./styles.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/slices/categoriesSlice/categoriesSlice";
import { Link } from "react-router-dom";
import { API_URL } from "../../contacts/api";
import Breadcrumbs from "../../components/appBreadcrumbs/index";

function CategoriesPage() {
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
    <div className={styles.categories}>
      <div className={styles.container}>
        <Breadcrumbs />
        <h2 className={styles.title}>Categories</h2>
        <ul className={styles.list}>
          {categories.map((category) => (
            <li key={category.title} className={styles.item}>
              <Link to={`/products/category/${category.id}`}>
                <img
                  className={styles.img}
                  src={`${API_URL}${category.image}`}
                  alt={category.title}
                />
                <p className={styles.itemTitle}>{category.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default CategoriesPage;
