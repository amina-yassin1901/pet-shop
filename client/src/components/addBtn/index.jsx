import styles from "./styles.module.css";
import { addToCart } from "../../redux/slices/cartSlice/cartSlice";
import { useSelector, useDispatch } from "react-redux";
function AddBtn({ product, localCount, setLocalCount }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const isAdded = cartItems.some((item) => item.id === product?.id);
  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!product) return;
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        discont_price: product.discont_price,
        image: product.image,
        count: localCount || 1,
      }),
    );

    if (setLocalCount) setLocalCount(1);
  };
  const buttonClass = `${styles.addButton} ${isAdded ? styles.btnAdded : ""}`;
  return (
    <button
      onClick={handleAddToCart}
      className={buttonClass}
      disabled={isAdded}
    >
      {isAdded ? "Added" : "Add to cart"}
    </button>
  );
}
export default AddBtn;
