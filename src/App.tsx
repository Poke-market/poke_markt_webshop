import Header from './components/Header';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from './components/Footer.tsx';

function App() {
  return (
    <Router>
      <Header />
      <Footer />
    </Router>
  );
}
export default App;
