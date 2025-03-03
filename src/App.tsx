import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.tsx";
import Homepage from "./pages/Homepage.tsx";
import DetailPage from "./pages/DetailPage.tsx";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/product/:name" element={<DetailPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
