import { useState } from "react";
import { 
  Button 
} from "@/components/ui/button";
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Settings,
  Bell,
  LogOut,
  User as UserIcon,
  Users as UsersIcon,
  BookOpen
} from "lucide-react";
import { useStateContext } from "../Contexts/ContextProvider"; 
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useStateContext(); 
  const navigate = useNavigate(); 

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
                <UserIcon className="h-5 w-5" />
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
            Welcome back, {user?.firstname || "User"}! 👋
          </h2>
          <p className="text-muted-foreground mb-4">
            Here's what's happening at Springfield High School today.
          </p>

          {/* User Roles Buttons */}
          <div className="flex gap-4">
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
              //onClick={() => navigate("/students")}
            >
              <UsersIcon className="h-5 w-5" /> Student
            </Button>
            <Button
              variant="secondary"
              className="flex items-center gap-2"
              //onClick={() => navigate("/professors")}
            >
              <BookOpen className="h-5 w-5" /> Professor
            </Button>
          </div>
        </div>

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
