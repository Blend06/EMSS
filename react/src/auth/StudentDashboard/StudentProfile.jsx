import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStateContext } from "../../Contexts/ContextProvider.jsx";
import { useEffect, useState } from "react";
import axiosClient from "../../axios.js";

const StudentProfile = () => {
    const { user, token } = useStateContext();
    const [student, setStudent] = useState(null);

    useEffect(() => {
        if (user?.id) {
            fetchStudent();
        }
    }, [user]);

    const fetchStudent = async () => {
        try {
            const response = await axiosClient.get(`/students/user/${user.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setStudent(response.data.data);
        } catch (error) {
            console.error("Error fetching student:", error);
        }
    };

    return (
        <div>
            <div className="flex-1 flex flex-col">
                <header className="bg-background border-b border-border p-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-foreground">
                                Welcome back, {user?.firstname} {user?.lastname}
                            </h1>
                            <p className="text-muted-foreground">
                                Here's your academic overview for today
                            </p>
                        </div>
                    </div>
                </header>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Current GPA
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-foreground">
                            {student?.gpa || "N/A"}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Courses
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-foreground">
                            {student?.active_courses || "N/A"}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Attendance
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-foreground">
                            {student?.attendance || "N/A"}%
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold mb-4">Your Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold">Personal Details</h3>
                            <p>
                                <span className="font-medium">Name:</span> {user?.firstname} {user?.lastname}
                            </p>
                            <p>
                                <span className="font-medium">Email:</span> {user?.email}
                            </p>
                            <p>
                                <span className="font-medium">Phone:</span> {user?.phone || "N/A"}
                            </p>
                            <p>
                                <span className="font-medium">Birthdate:</span> {user?.birthdate || "N/A"}
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Academic Details</h3>
                            <p>
                                <span className="font-medium">Student ID:</span> {student?.student_id || "N/A"}
                            </p>
                            <p>
                                <span className="font-medium">Group:</span> {student?.group?.group || "N/A"}
                            </p>
                            <p>
                                <span className="font-medium">Generation:</span> {student?.generation?.generation || "N/A"}
                            </p>
                            <p>
                                <span className="font-medium">Conduct Grade:</span> {student?.conduct_grade || "N/A"}
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Caretaker Details</h3>
                            <p>
                                <span className="font-medium">Caretaker Name:</span> {student?.caretaker_name || "N/A"}
                            </p>
                            <p>
                                <span className="font-medium">Caretaker Phone:</span> {student?.caretaker_phone || "N/A"}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default StudentProfile;