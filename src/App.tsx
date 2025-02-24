import FilterSortBar from "./components/FilterSortBar.tsx";
import Pagination from "./components/Pagination";
import BannerShop from "./components/BannerShop";

const App = () => {
  return (
    <div>
      <FilterSortBar />
      <BannerShop />
      <Pagination />
    </div>
  );
};

export default App;
