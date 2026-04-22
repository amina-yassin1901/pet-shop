import Hero from "../../components/hero";
import SaleList from "../../components/saleList";
import CategoriesList from "../../components/categoriesList";
import DiscountForm from "../../components/discountFrom";
function Home() {
  return (
    <div>
      <Hero />
      <CategoriesList />
      <DiscountForm />
      <SaleList />
    </div>
  );
}
export default Home;
