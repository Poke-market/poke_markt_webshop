import { BrowserRouter as Router } from "react-router-dom";
import { Header, Footer, ProductCard } from "./components";

function App() {
  return (
    <Router>
      <Header />
      <ProductCard id={0} />
      <Footer />
    </Router>
  );
}

export default App;
