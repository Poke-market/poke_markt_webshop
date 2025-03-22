import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout, Homepage, Cartpage, Detailpage, Loginpage } from "./utils";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/:page?" element={<Homepage />} />
          <Route path="/shop/:page?" element={<Homepage />} />
          <Route path="/cart" element={<Cartpage />} />
          <Route path="/item/:slug" element={<Detailpage />} />
          <Route path="/login" element={<Loginpage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
