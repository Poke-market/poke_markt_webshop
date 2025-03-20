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
          <Route path="/cart" element={<Cartpage />} />
          <Route path="/item/:name" element={<Detailpage />} />
          <Route path="/shop/:page?" element={<Homepage />} />
          <Route path="/:page?" element={<Homepage />} />
        </Routes>
        <ToastContainer {...toastConfig} />
      </Layout>
    </Router>
  );
}

export default App;
