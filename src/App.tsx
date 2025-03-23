import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Layout,
  Homepage,
  Cartpage,
  Detailpage,
  Loginpage,
  Registerpage,
  NotFound,
  Shoppage,
} from "./utils";
import { ToastContainer } from "react-toastify";
import { toastConfig } from "./config";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/shop/:page?" element={<Shoppage />} />
          <Route path="/cart" element={<Cartpage />} />
          <Route path="/item/:slug" element={<Detailpage />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/register" element={<Registerpage />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/shop" element={<Shoppage />} />
          <Route path="/" element={<Homepage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer {...toastConfig} />
      </Layout>
    </Router>
  );
}

export default App;
