import styles from "./styles.module.css";
import errorImg from "../../assets/img/404.png";
import { useNavigate } from "react-router-dom";
function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.notFound}>
      <div className={styles.container}>
        <img className={styles.img} src={errorImg} alt="error 404" />
        <div className={styles.content}>
          <h2 className={styles.title}>Page Not Found</h2>
          <p className={styles.text}>
            We’re sorry, the page you requested could not be found. Please go
            back to the homepage.
          </p>
          <button onClick={() => navigate("/")} className={styles.button}>
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}
export default NotFoundPage;
