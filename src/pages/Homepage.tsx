import { ProductGrid, PageBanner, FilterSortBar, UspBanner } from "../utils";
import { useAppSelector } from "../store";

const Homepage = () => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <>
      <PageBanner title="Shop" />
      {user && (
        <div style={{ padding: "10px", textAlign: "center" }}>
          <p>Hello, {user.firstname}! You are logged in.</p>
        </div>
      )}
      <FilterSortBar>
        <ProductGrid />
      </FilterSortBar>
      <UspBanner />
    </>
  );
};

export default Homepage;
