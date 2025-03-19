// src/App.tsx
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
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/shop" element={<Homepage />} />
              <Route path="/cart" element={<Cartpage />} />
              <Route path="/item/:name" element={<Detailpage />} />
              <Route path="/login" element={<Loginpage />} />
              <Route path="/register" element={<Registerpage />} />
            </Routes>
            <ToastContainer {...toastConfig} />
          </Layout>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
