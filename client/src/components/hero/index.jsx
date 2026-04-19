import styles from "./styles.module.css";
import heroImg from "../../assets/img/heroImg.png";
import { useNavigate } from "react-router-dom";
function Hero() {
  const navigate = useNavigate();
  return (
    <section className={styles.hero}>
      <div
        className={styles.container}
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <h2 className={styles.title}>Amazing Discounts on Pets Products!</h2>
        <button onClick={() => navigate("/sales")} className={styles.btn}>
          Check out
        </button>
      </div>
    </section>
  );
}
export default Hero;
