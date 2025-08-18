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
import StudentPage from "./dashboard/user/student/StudentPage";
import StudentForm from "./dashboard/user/student/StudentForm";
import GroupPage from "./dashboard/group/GroupPage";
import GroupForm from "./dashboard/group/GroupForm";

import SemesterForm from "./dashboard/semester/SemesterForm";
import SemesterPage from "./dashboard/semester/SemesterPage";
import YearForm from "./dashboard/year/YearForm";
import YearPage from "./dashboard/year/YearPage";
import GenerationPage from "./dashboard/generation/GenerationPage";
import GenerationForm from "./dashboard/generation/GenerationForm";

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

        {/* Student CRUD */}
        <Route path="/students" element={<StudentPage />} />
        <Route path="/students/new" element={<StudentForm />} />
        <Route path="/students/edit/:id" element={<StudentForm />} />
         
        {/* Group CRUD */}
        <Route path="/groups" element={<GroupPage />} />
        <Route path="/groups/new" element={<GroupForm />} />
        <Route path="/groups/edit/:id" element={<GroupForm />} />

        {/* Semester CRUD */}
        <Route path="/semester" element={<SemesterPage />} />
        <Route path="/semester/new" element={<SemesterForm />} />
        <Route path="/semester/edit/:id" element={<SemesterForm />} />
         {/* Year CRUD */}
        <Route path="/years" element={<YearPage />} />
        <Route path="/years/new" element={<YearForm />} />
        <Route path="/years/edit/:id" element={<YearForm />} />   

        {/* Generation CRUD */}
        <Route path="/generations" element={<GenerationPage />} />
        <Route path="/generations/new" element={<GenerationForm />} />
        <Route path="/generations/edit/:id" element={<GenerationForm />} />       
      </Routes>
    </>
  );
};

export default AppRoutes;
