import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/common/Layout.tsx";
import Homepage from "./pages/Homepage.tsx";
import CartPage from "./pages/Cartpage.tsx";
import Detailpage from "./pages/Detailpage.tsx";
import Loginpage from "./pages/Loginpage.tsx";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/shop" element={<Homepage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/item/:name" element={<Detailpage />} />
          <Route path="/login" element={<Loginpage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
