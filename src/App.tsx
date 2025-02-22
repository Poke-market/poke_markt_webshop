import { BrowserRouter as Router } from "react-router-dom";
import { Header, Footer, Shopgrid } from "./components";

function App() {
  return (
    <Router>
      <Header />
      <Shopgrid />
      <Footer />
    </Router>
  );
}

export default App;
