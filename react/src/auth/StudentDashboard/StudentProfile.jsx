import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStateContext } from "../../Contexts/ContextProvider.jsx";

const StudentProfile = () => {
    
      const { user, token, setToken, setUser } = useStateContext();

    return (
        <div>
            
            <div className="flex-1 flex flex-col">
                    {/* Header */}
                    <header className="bg-background border-b border-border p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h1 className="text-2xl font-bold text-foreground">Welcome back, {user?.firstname} {user?.lastname}
                          </h1>
                          <p className="text-muted-foreground">Here's your academic overview for today</p>
                        </div>
                        
                      </div>
                    </header>
                    </div>
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
                            <CardTitle className="text-sm font-medium text-muted-foreground">Attendance</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold text-foreground">95%</div>
                            <p className="text-xs text-green-600">Excellent attendance</p>
                          </CardContent>
                        </Card>
                      </div>
            
            {/* Add your profile components and logic here */}
        </div>
    );
}
export default StudentProfile;