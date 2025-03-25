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
  Wishlist,
  Aboutpage,
} from "./utils";
import { ToastContainer } from "react-toastify";
import { toastConfig } from "./config";
import "react-toastify/dist/ReactToastify.css";
import ProtectedAuthRoute from "./components/auth/ProtectedAuthRoute";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route
            path="/login"
            element={
              <ProtectedAuthRoute>
                <Loginpage />
              </ProtectedAuthRoute>
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedAuthRoute>
                <Registerpage />
              </ProtectedAuthRoute>
            }
          />
          <Route path="/shop/:page?" element={<Shoppage />} />
          <Route path="/cart" element={<Cartpage />} />
          <Route path="/item/:slug" element={<Detailpage />} />
          <Route path="/:page?" element={<Homepage />} />
          <Route path="/item/:slug" element={<Detailpage />} />
          <Route path="/" element={<Homepage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/about" element={<Aboutpage />} />
        </Routes>
        <ToastContainer {...toastConfig} />
      </Layout>
    </Router>
  );
}

export default App;
