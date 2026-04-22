import plus from "../../assets/icons/plus.svg";
import minus from "../../assets/icons/minus.svg";
import styles from "./styles.module.css";

function Counter({ count, onIncrement, onDecrement }) {
  return (
    <div className={styles.countEl}>
      <button className={styles.btn} onClick={onDecrement}>
        <img src={minus} alt="minus" />
      </button>
      <p className={styles.count}>{count}</p>
      <button className={styles.btn} onClick={onIncrement}>
        <img src={plus} alt="plus" />
      </button>
    </div>
  );
}
export default Counter;
