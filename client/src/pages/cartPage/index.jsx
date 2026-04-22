import styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../../contacts/api";
import Counter from "../../components/counter/index";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  incrementCount,
  decrementCount,
  removeFromCart,
  clearCart,
  sendOrder,
  resetStatus,
} from "../../redux/slices/cartSlice/cartSlice";
import close from "../../assets/icons/close.png";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
function CartPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);
  const { status } = useSelector((state) => state.cart);
  const totalCount = items.reduce((acc, item) => acc + item.count, 0);
  const totalPrice = items.reduce((acc, item) => {
    const price = item.discont_price || item.price;
    return acc + price * item.count;
  }, 0);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const orderData = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      products: items,
    };
    dispatch(sendOrder(orderData));
    e.currentTarget.reset();
  };

  useEffect(() => {
    if (status === "success") {
      setOpen(true);
    }
  }, [status]);
  const handleClose = () => {
    setOpen(false);
    dispatch(clearCart());
    dispatch(resetStatus());
  };
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.fullTitle}>
          <h3 className={styles.title}>Shopping cart</h3>
          <div className={styles.lineLink}>
            <span className={styles.line}></span>
            <a className={styles.link} href="/">
              Back to the store
            </a>
          </div>
        </div>
        {items.length === 0 ? (
          <div>
            <p>Looks like you have no items in your basket currently.</p>
            <button onClick={() => navigate("/")} className={styles.goBack}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className={styles.flex}>
              <ul className={styles.list}>
                {items.map((item) => {
                  const totalRegularPrice = (item.price * item.count).toFixed(
                    2,
                  );
                  const totalDiscountPrice = item.discont_price
                    ? (item.discont_price * item.count).toFixed(2)
                    : null;
                  return (
                    <li className={styles.item} key={item.id}>
                      <img
                        className={styles.image}
                        src={`${API_URL}${item.image}`}
                      />
                      <div className={styles.contentPart}>
                        <div className={styles.closeIcon}>
                          <h4 className={styles.itemTitle}>{item.title}</h4>
                          <button
                            onClick={() => dispatch(removeFromCart(item.id))}
                          >
                            <img src={close} width={24} height={24} />
                          </button>
                        </div>

                        <div className={styles.flexBox}>
                          <Counter
                            count={item.count}
                            onIncrement={() =>
                              dispatch(incrementCount(item.id))
                            }
                            onDecrement={() =>
                              dispatch(decrementCount(item.id))
                            }
                          />
                          <div className={styles.price}>
                            {item.discont_price ? (
                              <>
                                <span className={styles.newPrice}>
                                  ${totalDiscountPrice}
                                </span>
                                <span className={styles.oldPrice}>
                                  ${totalRegularPrice}
                                </span>
                              </>
                            ) : (
                              <span className={styles.priceOnly}>
                                ${totalRegularPrice}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div className={styles.orderDetails}>
                <h3 className={styles.orderTitle}>Order details</h3>
                <div className={styles.stats}>
                  <p className={styles.itemsCount}>{totalCount} items</p>
                  <div className={styles.totalRow}>
                    <span className={styles.totalLabel}>Total</span>
                    <span className={styles.totalValue}>
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>

                <form className={styles.orderForm} onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    required
                    className={styles.input}
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone number"
                    required
                    className={styles.input}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    className={styles.input}
                  />
                  <button
                    type="submit"
                    className={
                      status === "success"
                        ? styles.btnDisabled
                        : styles.orderBtn
                    }
                    disabled={status === "loading" || status === "success"}
                  >
                    {status === "success" ? "The Order is Placed" : "Order"}
                  </button>
                </form>
              </div>
            </div>
          </>
        )}
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "#0d50ff",
            color: "white",
            borderRadius: "12px",
            padding: "32px",
            backgroundImage: "none",
          },
        }}
      >
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "white",
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent sx={{ textAlign: "left", p: "32px", maxWidth: "548px" }}>
          <h2
            style={{
              fontSize: "40px",
              marginBottom: "24px",
              fontWeight: "600",
              color: "white",
            }}
          >
            Congratulations!
          </h2>
          <p
            style={{
              fontSize: "20px",
              lineHeight: "110%",
              fontWeight: "600",
              color: "white",
            }}
          >
            Your order has been successfully placed on the website.
          </p>
          <p
            style={{
              fontSize: "20px",
              marginTop: "10px",
              lineHeight: "110%",
              fontWeight: "600",
              color: "white",
            }}
          >
            A manager will contact you shortly to confirm your order.
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default CartPage;
