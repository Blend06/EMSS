import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Menu,
  X,
  BookOpen,
  Calendar,
  GraduationCap,
  CheckSquare,
  User,
  GroupIcon
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const StudentDashboard = () => {
   const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeRoute, setActiveRoute] = useState("dashboard");

  const navigationItems = [
    { id: "profile", label: "Profile", icon: User, route: "/student_dashboard/profile" },
    { id: "choose_group", label: "Choose Group", icon: GroupIcon, route: "/student_dashboard/choose_group" },
    { id: "schedule", label: "Schedule", icon: Calendar, route: "/student_dashboard/schedule" },
    { id: "grades", label: "Grades", icon: GraduationCap, route: "/student_dashboard/grades" },
    { id: "attendance", label: "Attendance", icon: CheckSquare, route: "/student_dashboard/attendance" },
    { id: "lectures", label: "Lectures", icon: BookOpen, route: "/lectures_page" },
    
  ];

  

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out flex flex-col`}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-sidebar-foreground">Student Portal</span>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-sidebar-foreground hover:bg-sidebar-accent"
            >
              {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
      <div className="space-y-2">
        {navigationItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeRoute === item.id;

          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={`w-full justify-start ${sidebarOpen ? 'px-3' : 'px-2'} ${
                isActive 
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90' 
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              }`}
              onClick={() => {
                setActiveRoute(item.id);
                navigate(item.route); // 👈 Navigate to the route
              }}
            >
              <IconComponent className={`h-5 w-5 ${sidebarOpen ? 'mr-3' : ''}`} />
              {sidebarOpen && <span>{item.label}</span>}
            </Button>
          );
        })}
      </div>
    </nav>
      </div>
      

        {/* Dashboard Content */}
        <main className="flex-1 p-6 space-y-6 overflow-auto">
          
          
        <Outlet />
          
        </main>
      </div>
    
  );
};

export default StudentDashboard;
