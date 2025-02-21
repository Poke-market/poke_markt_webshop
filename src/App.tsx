import { BrowserRouter as Router } from "react-router-dom";
import { Header, Footer, ProductCard } from "./components";

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
