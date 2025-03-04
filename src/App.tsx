import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.tsx";
import Homepage from "./pages/Homepage.tsx";
import Detailpage from "./pages/Detailpage.tsx";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/product/:itemName" element={<Detailpage />} />
          <Route path="/detailpage" element={<Detailpage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
