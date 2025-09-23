import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStateContext } from "../../Contexts/ContextProvider.jsx";
import { useEffect, useState } from "react";
import axiosClient from "../../axios.js";

const StudentProfile = () => {
  const { user, token } = useStateContext();
  const [student, setStudent] = useState(null);
  const [average, setAverage] = useState(null);

  useEffect(() => {
    if (user?.id) {
      fetchStudent();
      fetchGrades();
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

  const fetchGrades = async () => {
    try {
      const response = await axiosClient.get("/my_grades", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAverage(response.data.average);
    } catch (error) {
      console.error("Error fetching grades:", error.response || error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="p-6 shadow-md border-primary/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {user?.firstname} {user?.lastname}
            </h1>
            <p className="text-muted-foreground">{user?.email}</p>
          </div>
          
        </div>
      </Card>

      {/* Information Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Personal */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Personal Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Phone: </span>
                {user?.phone || "N/A"}
              </p>
              <p>
                <span className="font-medium">Birthdate: </span>
                {user?.birthdate || "N/A"}
              </p>
              <p>
                <span className="font-medium">ID: </span>
                {student?.id_card_number || "N/A"}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Academic */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Academic Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Student ID: </span>
                {student?.student_id || "N/A"}
              </p>
              <p>
                <span className="font-medium">Group: </span>
                {student?.group?.group || "N/A"}
              </p>
              <p>
                <span className="font-medium">Semester: </span>
                {student?.group?.semester?.semester || "N/A"}
              </p>
              <p>
                <span className="font-medium">Year: </span>
                {student?.group?.semester?.year?.academic_year || "N/A"}
              </p>
              <p>
                <span className="font-medium">Current GPA: </span>
                {average !== null ? average.toFixed(2) : "N/A"}
              </p>
              
              <p>
                <span className="font-medium">Conduct Grade: </span>
                {student?.conduct_grade || "N/A"}
              </p>
              
            </div>
          </CardContent>
        </Card>

        {/* Caretaker */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Caretaker Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Name: </span>
                {student?.caretaker_name || "N/A"}
              </p>
              <p>
                <span className="font-medium">Phone: </span>
                {student?.caretaker_phone || "N/A"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentProfile;
