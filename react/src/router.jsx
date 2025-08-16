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

import UserPage from "./dashboard/user/UserPage";
import UserForm from "./dashboard/user/UserForm";
import ProfessorPage from "./dashboard/user/professor/ProfessorPage";
import ProfessorForm from "./dashboard/user/professor/ProfessorForm";

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

        {/* User CRUD */}
        <Route path="/users" element={<UserPage />} />
        <Route path="/users/new" element={<UserForm />} />
        <Route path="/users/edit/:id" element={<UserForm />} />

        {/* Professor CRUD */}
        <Route path="/professors" element={<ProfessorPage />} />
        <Route path="/professors/new" element={<ProfessorForm />} />
        <Route path="/professors/edit/:id" element={<ProfessorForm />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
