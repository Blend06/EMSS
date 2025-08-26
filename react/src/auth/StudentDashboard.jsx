import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LogOut,
  Menu,
  X,
  Home,
  BookOpen,
  Calendar,
  FileText,
  Clock,
  GraduationCap,
  Users,
  CheckSquare,
  User,
  Bell
} from "lucide-react";

const StudentDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeRoute, setActiveRoute] = useState("dashboard");

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, route: "/student/dashboard" },
    { id: "courses", label: "My Courses", icon: BookOpen, route: "/student/courses" },
    { id: "schedule", label: "Schedule", icon: Calendar, route: "/student/schedule" },
    { id: "assignments", label: "Assignments", icon: FileText, route: "/student/assignments" },
    { id: "grades", label: "Grades", icon: GraduationCap, route: "/student/grades" },
    { id: "attendance", label: "Attendance", icon: CheckSquare, route: "/student/attendance" },
    { id: "classmates", label: "Classmates", icon: Users, route: "/student/classmates" },
    { id: "profile", label: "Profile", icon: User, route: "/student/profile" },
    { id: "notifications", label: "Notifications", icon: Bell, route: "/student/notifications" }
  ];

  const upcomingClasses = [
    { subject: "Mathematics", time: "9:00 AM", room: "Room 101" },
    { subject: "Physics", time: "11:00 AM", room: "Lab 205" },
    { subject: "Literature", time: "2:00 PM", room: "Room 302" }
  ];

  const recentGrades = [
    { subject: "Chemistry", grade: "A-", assignment: "Lab Report #3" },
    { subject: "History", grade: "B+", assignment: "Essay: World War II" },
    { subject: "Mathematics", grade: "A", assignment: "Calculus Test" }
  ];

  const pendingAssignments = [
    { subject: "English", title: "Research Paper", dueDate: "Nov 28" },
    { subject: "Biology", title: "Cell Structure Lab", dueDate: "Nov 30" },
    { subject: "Computer Science", title: "Final Project", dueDate: "Dec 5" }
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
                  onClick={() => setActiveRoute(item.id)}
                >
                  <IconComponent className={`h-5 w-5 ${sidebarOpen ? 'mr-3' : ''}`} />
                  {sidebarOpen && <span>{item.label}</span>}
                </Button>
              );
            })}
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-sidebar-border">
          <Button
            variant="ghost"
            className={`w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent ${sidebarOpen ? 'px-3' : 'px-2'}`}
          >
            <LogOut className={`h-5 w-5 ${sidebarOpen ? 'mr-3' : ''}`} />
            {sidebarOpen && <span>Logout</span>}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-background border-b border-border p-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Welcome back, John! 👋</h1>
              <p className="text-muted-foreground">Here's your academic overview for today</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary">Springfield High School</Badge>
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-primary-foreground" />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6 space-y-6 overflow-auto">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Current GPA</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">3.85</div>
                <p className="text-xs text-green-600">+0.12 from last semester</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Courses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">6</div>
                <p className="text-xs text-muted-foreground">Active this semester</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Pending Assignments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">3</div>
                <p className="text-xs text-orange-600">2 due this week</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">95%</div>
                <p className="text-xs text-green-600">Excellent attendance</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Today's Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Today's Classes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingClasses.map((classItem, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">{classItem.subject}</p>
                      <p className="text-sm text-muted-foreground">{classItem.room}</p>
                    </div>
                    <Badge variant="outline">{classItem.time}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Grades */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Recent Grades
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentGrades.map((grade, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">{grade.subject}</p>
                      <p className="text-sm text-muted-foreground">{grade.assignment}</p>
                    </div>
                    <Badge variant={grade.grade.startsWith('A') ? 'default' : 'secondary'}>
                      {grade.grade}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Pending Assignments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Pending Assignments
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {pendingAssignments.map((assignment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">{assignment.title}</p>
                      <p className="text-sm text-muted-foreground">{assignment.subject}</p>
                    </div>
                    <Badge variant="outline">{assignment.dueDate}</Badge>
                  </div>
                ))}
                <Button className="w-full mt-4" variant="outline">
                  View All Assignments
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Academic Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Academic Progress</CardTitle>
              <p className="text-muted-foreground">Your performance this semester</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">85%</div>
                  <p className="text-sm text-muted-foreground">Assignment Completion</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">92%</div>
                  <p className="text-sm text-muted-foreground">Quiz Average</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">88%</div>
                  <p className="text-sm text-muted-foreground">Exam Average</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
