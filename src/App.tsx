import Header from "./components/Header";
import { BrowserRouter as Router } from "react-router-dom";
import Footer from "./components/Footer.tsx";
import ProductCard from "./components/ProductCard.tsx";

function App() {
  return (
    <Router>
      <Header />
      <ProductCard />
      <Footer />
    </Router>
  );
}
export default App;
