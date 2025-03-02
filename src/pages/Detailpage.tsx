import Breadcrumb from "../components/Breadcrumb";
import { useParams } from "react-router-dom";

const Detailpage = () => {
  // Get the itemName parameter from the URL
  const { itemName } = useParams();

  return (
    <div>
      <Breadcrumb />
      <h1>Product Details for: {itemName}</h1>
      {/* You can use the itemName to fetch specific product data */}
    </div>
  );
};
export default Detailpage;
