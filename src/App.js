import './styles/main.scss';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import PizzaPage from "./pages/PizzaPage/PizzaPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/pizza/:id" element={<PizzaPage />} />
      </Routes>
    </Router>
  );
}

export default App;
