import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import SmoothScroll from "./components/SmoothScroll";
import Navbar from "./components/Navbar";

function App() {
  return (
    <SmoothScroll>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </Router>
    </SmoothScroll>
  );
}

export default App;

