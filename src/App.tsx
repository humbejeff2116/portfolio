import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { ThemeTransitionOverlay } from "./components/ThemeTransitionOverlay";
import { CustomCursor } from "./components/CustomCursor";
import { AnimatePresence, motion } from "framer-motion";
import ScrollProgressBar from "./components/ScrollProgressBar";
import DynamicLight from "./components/DynamicLight";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import { SmoothScroll } from "./components/SmoothScroll";
import { ScrollToTopButton } from "./components/ScrollToTopButton";
import NotFound from "./pages/NotFound";
import './App.css';

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
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <Home />
              </motion.div>
            }
          />

          <Route
            path="*"
            element={
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <NotFound />
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>
      <ThemeTransitionOverlay />
      <CustomCursor />
        {/* Not yet visible TODO... fix it */}
      <DynamicLight />
      <ScrollToTopButton />
    </SmoothScroll>
 
    </div>
  );
}

export default App;

