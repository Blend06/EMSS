// src/router.jsx
import { Routes, Route, useLocation } from "react-router-dom";
import Navigation from "./components/Navigation";
import Landing from "./pages/Landing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Dashboard from "./auth/Dashboard";
import NotFound from "./pages/NotFound";

const AppRoutes = () => {
  const location = useLocation();

  const noNavRoutes = ['/login', '/register', '/dashboard'];
  const showNavigation = !noNavRoutes.includes(location.pathname);

  return (
    <>
      {showNavigation && <Navigation />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
