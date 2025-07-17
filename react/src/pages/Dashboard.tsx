import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Plus, 
  Search, 
  Filter,
  Users,
  BookOpen,
  Calendar,
  BarChart3,
  Settings,
  Bell,
  LogOut,
  User,
  Edit3,
  Trash2,
  Eye
} from "lucide-react";

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Sample data for CRUD operations
  const [students] = useState([
    { id: 1, name: "Alice Johnson", email: "alice@email.com", grade: "10th", status: "Active" },
    { id: 2, name: "Bob Smith", email: "bob@email.com", grade: "11th", status: "Active" },
    { id: 3, name: "Carol Davis", email: "carol@email.com", grade: "9th", status: "Inactive" },
  ]);

  const [courses] = useState([
    { id: 1, name: "Mathematics", teacher: "Dr. Wilson", students: 28, status: "Active" },
    { id: 2, name: "Physics", teacher: "Prof. Anderson", students: 24, status: "Active" },
    { id: 3, name: "Chemistry", teacher: "Dr. Brown", students: 22, status: "Active" },
  ]);

  const stats = [
    { title: "Total Students", value: "1,234", icon: Users, change: "+12%" },
    { title: "Active Courses", value: "56", icon: BookOpen, change: "+3%" },
    { title: "Upcoming Events", value: "8", icon: Calendar, change: "+2%" },
    { title: "Reports Generated", value: "24", icon: BarChart3, change: "+18%" },
  ];

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
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
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
            Welcome back, Principal Johnson! 👋
          </h2>
          <p className="text-muted-foreground">
            Here's what's happening at Springfield High School today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-border hover:shadow-medium transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-secondary font-medium">{stat.change}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CRUD Operations Section */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Students Management */}
          <Card className="border-border">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Student Management</CardTitle>
                  <CardDescription>Manage student records and information</CardDescription>
                </div>
                <Button variant="educational" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Student
                </Button>
              </div>
              <div className="flex gap-2 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {students.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">
                          {student.name[0]}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{student.name}</p>
                          <p className="text-sm text-muted-foreground">{student.email} • {student.grade}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={student.status === 'Active' ? 'default' : 'secondary'}>
                        {student.status}
                      </Badge>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit3 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Courses Management */}
          <Card className="border-border">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Course Management</CardTitle>
                  <CardDescription>Manage courses and class schedules</CardDescription>
                </div>
                <Button variant="educational" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Course
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courses.map((course) => (
                  <div key={course.id} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-secondary rounded-full flex items-center justify-center text-secondary-foreground text-sm font-bold">
                          {course.name[0]}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{course.name}</p>
                          <p className="text-sm text-muted-foreground">{course.teacher} • {course.students} students</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="default">{course.status}</Badge>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit3 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-8 border-border">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used tools and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex-col">
                <Users className="h-6 w-6 mb-2" />
                <span className="text-sm">Manage Users</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <BookOpen className="h-6 w-6 mb-2" />
                <span className="text-sm">Course Builder</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <Calendar className="h-6 w-6 mb-2" />
                <span className="text-sm">Schedule Events</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <BarChart3 className="h-6 w-6 mb-2" />
                <span className="text-sm">Generate Reports</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Note about backend functionality */}
        <Card className="mt-8 border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                🚀 Ready for Full Functionality?
              </h3>
              <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-4">
                To enable full CRUD operations, user authentication, and data persistence, 
                connect your project to Supabase using the green button in the top right.
              </p>
              <Button variant="educational" size="sm">
                Learn More About Backend Integration
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;