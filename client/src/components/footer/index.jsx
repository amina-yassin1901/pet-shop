import styles from "./styles.module.css";
import insta from "../../assets/icons/ic-instagram.svg";
import whatsapp from "../../assets/icons/ic-whatsapp.svg";
function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <h2 className={styles.title}>Contact</h2>

        <div className={styles.grid}>
          <div className={styles.card}>
            <span className={styles.label}>Phone</span>
            <a href="tel:+493091588492" className={styles.value}>
              +49 30 915-88492
            </a>
          </div>

          <div className={styles.card}>
            <span className={styles.label}>Socials</span>
            <div className={styles.socials}>
              <a href="https://www.instagram.com/" className={styles.icon}>
                <img src={insta} alt="insta svg" />
              </a>
              <a href="https://web.whatsapp.com/" className={styles.icon}>
                <img src={whatsapp} alt="whatsapp" />
              </a>
            </div>
          </div>

          <div className={`${styles.card} ${styles.address}`}>
            <span className={styles.label}>Address</span>
            <p className={styles.value}>
              Wallstraße 9-13, 10179 Berlin, Deutschland
            </p>
          </div>

          <div className={styles.card}>
            <span className={styles.label}>Working Hours</span>
            <p className={styles.value}>24 hours a day</p>
          </div>
        </div>

        <div className={styles.mapWrapper}>
          <iframe
            src="https://www.google.com/maps?q=Wallstraße+9-13,+Berlin&output=embed"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
