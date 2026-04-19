import styles from "./styles.module.css";
import Hero from "../../components/hero";
import CategoriesList from "../../components/categoriesList";
import DiscountForm from "../../components/discountFrom";
function Home() {
  return (
    <div className={styles.page}>
      <Hero />
      <CategoriesList />
      <DiscountForm />
    </div>
  );
}
export default Home;
