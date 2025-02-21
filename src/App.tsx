import { BrowserRouter as Router } from "react-router-dom";
import { Header, Footer, ProductCard } from "./components";
import Shopgrid from "./components/Shopgrid";

function App() {
  return (
    <Router>
      <Header />
      <ProductCard />
      <Shopgrid />
      <Footer />
    </Router>
  );
}

export default App;
