import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import axiosClient from '../axios.js';
import {
  LogOut,
  User as UserIcon,
  Users as UsersIcon,
  BookOpen,
  Layers,
  Calendar,
  GraduationCap,
  ClipboardList,
  ListChecks,
  Clock,
  FileText,
  School,
  Home
} from "lucide-react";
import { useStateContext } from "../Contexts/ContextProvider";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { user, token, setToken, setUser } = useStateContext();
  const navigate = useNavigate();
  
  const onLogout = (ev) => {
    ev.preventDefault();

    axiosClient.post('/logout')
      .then(() => {
        setUser({});
        setToken(null);
        navigate('/login');
      })
      .catch((error) => {
        console.error('Logout failed:', error);
        setUser({});
        setToken(null);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
              <Badge variant="secondary">Academix Pro</Badge>
            </div>
            <div className="flex items-center space-x-4">
              
              <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
                <Home className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={onLogout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {user?.firstname || "User"}! 👋
          </h2>
          <p className="text-muted-foreground mb-4">
            Here's what's happening at Springfield High School today.
          </p>

          {/* Role / Entity Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            <Button
              variant="secondary"
              className="flex items-center gap-2"
              onClick={() => navigate("/users")}
            >
              <UserIcon className="h-5 w-5" /> User
            </Button>
            <Button
              variant="secondary"
              className="flex items-center gap-2"
              onClick={() => navigate("/students")}
            >
              <UsersIcon className="h-5 w-5" /> Student
            </Button>
            <Button
              variant="secondary"
              className="flex items-center gap-2"
              onClick={() => navigate("/professors")}
            >
              <BookOpen className="h-5 w-5" /> Professor
            </Button>
            <Button
              variant="secondary"
              className="flex items-center gap-2"
              onClick={() => navigate("/groups")}
            >
              <Layers className="h-5 w-5" /> Group
            </Button>
            <Button
              variant="secondary"
              className="flex items-center gap-2"
              onClick={() => navigate("/subjects")}
            >
              <BookOpen className="h-5 w-5" /> Subject
            </Button>
            <Button
              variant="secondary"
              className="flex items-center gap-2"
              onClick={() => navigate("/years")}
            >
              <Calendar className="h-5 w-5" /> Year
            </Button>
            <Button
              variant="secondary"
              className="flex items-center gap-2"
              onClick={() => navigate("/semester")}
            >
              <ClipboardList className="h-5 w-5" /> Semester
            </Button>
            <Button
              variant="secondary"
              className="flex items-center gap-2"
              onClick={() => navigate("/classes")}
            >
              <School className="h-5 w-5" /> Class
            </Button>
            <Button
              variant="secondary"
              className="flex items-center gap-2"
              onClick={() => navigate("/attendances")}
            >
              <ListChecks className="h-5 w-5" /> Attendance
            </Button>
            <Button
              variant="secondary"
              className="flex items-center gap-2"
              onClick={() => navigate("/schedules")}
            >
              <Clock className="h-5 w-5" /> Schedule
            </Button>
            <Button
              variant="secondary"
              className="flex items-center gap-2"
              onClick={() => navigate("/grades")}
            >
              <FileText className="h-5 w-5" /> Grade
            </Button>
            <Button
              variant="secondary"
              className="flex items-center gap-2"
              onClick={() => navigate("/lectures")}
            >
              <BookOpen className="h-5 w-5" /> Lecture
            </Button>
            <Button
              variant="secondary"
              className="flex items-center gap-2"
              onClick={() => navigate("/professors_subjects")}
            >
              <ClipboardList className="h-5 w-5" /> Professor Subjects
            </Button>
            <Button
              variant="secondary"
              className="flex items-center gap-2"
              onClick={() => navigate("/pending_students")}
            >
              <ClipboardList className="h-5 w-5" /> Pending Students
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
