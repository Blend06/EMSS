import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  Home,
  TrendingUp,
  Activity,
  Database,
  BarChart3
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../Contexts/ContextProvider";
import axiosClient from "../axios";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 247,
    totalStudents: 1840,
    totalProfessors: 89,
    totalSubjects: 42,
    loading: false
  });

  const { user, setToken, setUser } = useStateContext();
  const navigate = useNavigate();

  // Protect dashboard — redirect if not admin
  useEffect(() => {
    if (!user || !(user.isAdmin === true || user.isAdmin === 1)) {
      navigate("/"); 
    }
  }, [user, navigate]);

  useEffect(() => {
    setStats((prev) => ({ ...prev, loading: true }));
    const timer = setTimeout(() => {
      setStats((prev) => ({ ...prev, loading: false }));
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const onLogout = (ev) => {
    ev.preventDefault();
    axiosClient
      .post("/logout")
      .then(() => {
        setUser({});
        setToken(null);
        navigate("/login");
      })
      .catch(() => {
        setUser({});
        setToken(null);
      });
  };

  /** reusable cards */
  const StatCard = ({ title, value, icon: Icon, trend, description }) => (
    <Card className="relative overflow-hidden border-border/50 hover:border-border transition-all duration-300 hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-foreground mb-1">
          {stats.loading ? (
            <div className="h-8 w-16 bg-muted rounded animate-pulse" />
          ) : (
            value.toLocaleString()
          )}
        </div>
        <div className="flex items-center space-x-2 text-xs">
          <TrendingUp className="h-3 w-3 text-green-500" />
          <span className="text-green-500 font-medium">{trend}</span>
          <span className="text-muted-foreground">{description}</span>
        </div>
      </CardContent>
    </Card>
  );

  const NavigationCard = ({ title, icon: Icon, onClick, description }) => (
    <Card
      className="cursor-pointer border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-md hover:scale-105 group"
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 rounded-xl bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-colors">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl font-bold text-foreground">
                  Academix Pro
                </h1>
              </div>
              <Badge variant="secondary" className="hidden sm:inline-flex">
                <Activity className="h-3 w-3 mr-1" />
                Admin Dashboard
              </Badge>
            </div>
            <div className="flex items-center space-x-3">
              <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/")}
                className="hover:bg-accent"
              >
                <Home className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onLogout}
                className="hover:bg-destructive/10 hover:text-destructive"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-2">
                Welcome back, {user?.firstname || "Administrator"}
              </h2>
              <p className="text-lg text-muted-foreground">
                AcademixPro School Management System
              </p>
            </div>
            <div className="hidden lg:flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Analytics
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Users"
              value={stats.totalUsers}
              icon={UserIcon}
              trend="+12%"
              description="vs last month"
            />
            <StatCard
              title="Active Students"
              value={stats.totalStudents}
              icon={GraduationCap}
              trend="+8%"
              description="enrolled this semester"
            />
            <StatCard
              title="Faculty Members"
              value={stats.totalProfessors}
              icon={BookOpen}
              trend="+3%"
              description="teaching staff"
            />
            <StatCard
              title="Subjects Offered"
              value={stats.totalSubjects}
              icon={Layers}
              trend="+5%"
              description="active courses"
            />
          </div>

          {/* Core Entities */}
          <div className="flex items-center space-x-2 mb-6">
            <h3 className="text-2xl font-bold text-foreground">
              System Management
            </h3>
            <div className="h-px flex-1 bg-border" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
            <NavigationCard
              title="Users"
              icon={UserIcon}
              description="Manage system users"
              onClick={() => navigate("/users")}
            />
            <NavigationCard
              title="Students"
              icon={GraduationCap}
              description="Student enrollment"
              onClick={() => navigate("/students")}
            />
            <NavigationCard
              title="Professors"
              icon={BookOpen}
              description="Faculty management"
              onClick={() => navigate("/professors")}
            />
            <NavigationCard
              title="Groups"
              icon={UsersIcon}
              description="Student groups"
              onClick={() => navigate("/groups")}
            />
            <NavigationCard
              title="Subjects"
              icon={Layers}
              description="Course catalog"
              onClick={() => navigate("/subjects")}
            />
            <NavigationCard
              title="Academic Years"
              icon={Calendar}
              description="Year management"
              onClick={() => navigate("/years")}
            />
            <NavigationCard
              title="Semesters"
              icon={ClipboardList}
              description="Term periods"
              onClick={() => navigate("/semester")}
            />
            <NavigationCard
              title="Classes"
              icon={School}
              description="Class schedules"
              onClick={() => navigate("/classes")}
            />
          </div>

          {/* Academic Operations */}
          <div className="flex items-center space-x-2 mb-6">
            <h3 className="text-xl font-semibold text-foreground">
              Academic Operations
            </h3>
            <div className="h-px flex-1 bg-border" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <NavigationCard
              title="Attendance Tracking"
              icon={ListChecks}
              description="Monitor student attendance"
              onClick={() => navigate("/attendances")}
            />
            <NavigationCard
              title="Schedule Management"
              icon={Clock}
              description="Timetable coordination"
              onClick={() => navigate("/schedules")}
            />
            <NavigationCard
              title="Grade Management"
              icon={FileText}
              description="Academic assessments"
              onClick={() => navigate("/grades")}
            />
            <NavigationCard
              title="Lecture Hall"
              icon={BookOpen}
              description="Classroom assignments"
              onClick={() => navigate("/lectures")}
            />
            <NavigationCard
              title="Professor Subjects"
              icon={ClipboardList}
              description="Teaching assignments"
              onClick={() => navigate("/professors_subjects")}
            />
            <NavigationCard
              title="Pending Students"
              icon={Clock}
              description="Enrollment requests"
              onClick={() => navigate("/pending_students")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
