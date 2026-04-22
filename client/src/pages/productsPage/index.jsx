import styles from "./styles.module.css";
import { useParams, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { fetchProducts } from "../../redux/slices/productsSlice/productsSlice";
import { fetchCategories } from "../../redux/slices/categoriesSlice/categoriesSlice";
import CardProduct from "../../components/cardProduct/index";
import Breadcrumbs from "../../components/appBreadcrumbs/index";

function ProductsPage() {
  const dispatch = useDispatch();
  const { categoryId } = useParams();
  const location = useLocation();
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [onlyDiscount, setOnlyDiscount] = useState(false);
  const [sortType, setSortType] = useState("default");

  const { items, loading, error } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);

  const mode = categoryId
    ? "category"
    : location.pathname.includes("sale")
      ? "sale"
      : "all";

  useEffect(() => {
    if (mode === "category" && categoryId) {
      dispatch(fetchProducts({ mode, categoryId }));
    } else {
      dispatch(fetchProducts({ mode }));
    }
  }, [dispatch, mode, categoryId]);

  useEffect(() => {
    if (!categories.length) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length]);

  const currentCategory = categories.find(
    (cat) => cat.id === Number(categoryId),
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  let filteredItems = [...items];
  if (onlyDiscount) {
    filteredItems = filteredItems.filter(
      (item) => item.discont_price && item.discont_price < item.price,
    );
  }
  filteredItems = filteredItems.filter((item) => {
    const currentPrice = item.discont_price || item.price;

    if (priceFrom && currentPrice < Number(priceFrom)) return false;
    if (priceTo && currentPrice > Number(priceTo)) return false;

    return true;
  });
  if (sortType === "price-asc") {
    filteredItems.sort(
      (a, b) => (a.discont_price || a.price) - (b.discont_price || b.price),
    );
  } else if (sortType === "price-desc") {
    filteredItems.sort(
      (a, b) => (b.discont_price || b.price) - (a.discont_price || a.price),
    );
  }
  return (
    <div className={styles.categories}>
      <div className={styles.container}>
        <Breadcrumbs />
        {mode === "all" && <h2 className={styles.title}>All products</h2>}
        {mode === "sale" && <h2 className={styles.title}>Discounted items</h2>}
        {mode === "category" && (
          <h2 className={styles.title}>
            {currentCategory ? currentCategory.title : "Loading..."}
          </h2>
        )}
        <div className={styles.filters}>
          <div className={styles.filterBlock}>
            <span className={styles.selectTitle}>Price</span>
            <div className={styles.priceInputs}>
              <input
                type="number"
                placeholder="from"
                value={priceFrom}
                onChange={(e) => setPriceFrom(e.target.value)}
              />
              <input
                type="number"
                placeholder="to"
                value={priceTo}
                onChange={(e) => setPriceTo(e.target.value)}
              />
            </div>
          </div>

          {mode !== "sale" && (
            <div className={styles.filterBlock}>
              <label for="label" className={styles.selectTitle}>
                Discounted items
              </label>
              <input
                id="label"
                className={styles.checkbox}
                type="checkbox"
                checked={onlyDiscount}
                onChange={(e) => setOnlyDiscount(e.target.checked)}
              />
            </div>
          )}

          <div className={styles.filterBlock}>
            <span className={styles.selectTitle}>Sorted</span>

            <FormControl size="small">
              <Select
                value={sortType}
                onChange={(e) => setSortType(e.target.value)}
                IconComponent={ExpandMoreIcon}
                sx={{
                  borderRadius: "6px",
                  "& .MuiSelect-select": {
                    padding: "8px 16px",
                    fontSize: "16px",
                    marginRight: "40px",
                  },
                  "& fieldset": {
                    border: "1px solid #ddd;",
                  },
                }}
              >
                <MenuItem value="default">by default</MenuItem>
                <MenuItem value="price-asc">price: low to high</MenuItem>
                <MenuItem value="price-desc">price: high to low</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <ul className={styles.list}>
          {Array.isArray(filteredItems) &&
            filteredItems.map((item) => (
              <CardProduct key={item.id} item={item} />
            ))}
        </ul>
      </div>
    </div>
  );
}

export default ProductsPage;
