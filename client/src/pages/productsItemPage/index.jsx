import styles from "./styles.module.css";
import AddBtn from "../../components/addBtn/index";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { API_URL } from "../../contacts/api";
import { fetchProductById } from "../../redux/slices/productsSlice/productsSlice";
import Breadcrumbs from "../../components/appBreadcrumbs/index";
import Counter from "../../components/counter/index";
function ProductsItemPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [localCount, setLocalCount] = useState(1);
  const { currentProduct, loading, error } = useSelector(
    (state) => state.products,
  );
  const [isExpanded, setIsExpanded] = useState(false);
  const handleIncrement = () => setLocalCount((prev) => prev + 1);
  const handleDecrement = () =>
    setLocalCount((prev) => (prev > 1 ? prev - 1 : 1));
  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  const getDiscountPercent = (price, discountPrice) => {
    return Math.round(((price - discountPrice) / price) * 100);
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!currentProduct) return null;
  const toggleText = () => {
    setIsExpanded((prev) => !prev);
  };
  const shortText =
    currentProduct.description?.length > 683
      ? currentProduct.description.slice(0, 683) + "..."
      : currentProduct.description;
  return (
    <div className={styles.product}>
      <div className={styles.container}>
        <Breadcrumbs />
        <div className={styles.flexContainer}>
          <img
            className={styles.img}
            src={`${API_URL}${currentProduct.image}`}
          />
          <div className={styles.context}>
            <h3 className={styles.title}>{currentProduct.title}</h3>
            <div className={styles.price}>
              {currentProduct.discont_price ? (
                <>
                  <span className={styles.newPrice}>
                    ${currentProduct.discont_price}
                  </span>
                  <span className={styles.oldPrice}>
                    ${currentProduct.price}
                  </span>
                </>
              ) : (
                <span className={styles.priceOnly}>
                  ${currentProduct.price}
                </span>
              )}
              {currentProduct.discont_price && (
                <div className={styles.badge}>
                  -
                  {getDiscountPercent(
                    currentProduct.price,
                    currentProduct.discont_price,
                  )}
                  %
                </div>
              )}
            </div>
            <div className={styles.btnsBox}>
              <Counter
                count={localCount}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
              />
              <div className={styles.btnDiv}>
                <AddBtn
                  product={currentProduct}
                  localCount={localCount}
                  setLocalCount={setLocalCount}
                />
              </div>
            </div>

            <div className={styles.textFull}>
              <p className={styles.descr}>Description</p>
              <p className={styles.text}>
                {isExpanded ? currentProduct.description : shortText}
              </p>

              {currentProduct.description?.length > 683 && (
                <button className={styles.readMoreBtn} onClick={toggleText}>
                  {isExpanded ? "Show less" : "Read more"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductsItemPage;
