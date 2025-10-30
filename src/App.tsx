import { Routes, Route, useLocation } from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import SmoothScroll from "./components/SmoothScroll";
import Navbar from "./components/Navbar";
import { ThemeTransitionOverlay } from "./components/ThemeTransitionOverlay";
import { CustomCursor } from "./components/CustomCursor";
// import Footer from "./components/Footer";
import { AnimatePresence, motion } from "framer-motion";
// import PageTransitionOverlay from "./components/PageTransitionOverlay";
import ScrollProgressBar from "./components/ScrollProgressBar";
import DynamicLight from "./components/DynamicLight";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
// import { useSmoothScroll } from "./hooks/useSmoothScroll";

function App() {
  const location = useLocation();
  useSmoothScroll();

  return (
    <div className="relative bg-black text-white min-h-screen overflow-x-hidden">
    <SmoothScroll>
      
      <Navbar />
      <ScrollProgressBar />
      {/* <PageTransitionOverlay /> */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <Home />
              </motion.div>
            }
          />
          <Route
            path="/projects"
            element={
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <Projects />
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>
      {/* Cinematic transition effect */}
      <ThemeTransitionOverlay />
      <CustomCursor />
      {/* <Footer/> */}
    </SmoothScroll>
    {/* Not yet visible TODO... fix it */}
    <DynamicLight />
    </div>
  );
}

export default App;

