import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Layout,
  Homepage,
  Cartpage,
  Detailpage,
  Loginpage,
  Registerpage,
} from "./utils";
import { ToastContainer } from "react-toastify";
import { toastConfig } from "./config";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/:page?" element={<Homepage />} />
          <Route path="/shop/:page?" element={<Homepage />} />
          <Route path="/cart" element={<Cartpage />} />
          <Route path="/item/:name" element={<Detailpage />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/register" element={<Registerpage />} />
        </Routes>
        <ToastContainer {...toastConfig} />
      </Layout>
    </Router>
  );
}

export default App;
