import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../axios.js";

const AttendancePage = () => {
  const [attendances, setAttendances] = useState([]);
  const navigate = useNavigate();

  const fetchAttendances = async () => {
    const res = await axiosClient.get("/attendances");
    setAttendances(res.data.data);
  };

  useEffect(() => {
    fetchAttendances();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this attendance?")) return;
    try {
      await axiosClient.delete(`/attendances/${id}`);
      setAttendances(attendances.filter((a) => a.attendance_id !== id));
    } catch (error) {
      console.error("Failed to delete attendance", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Attendances</h1>
        <Button onClick={() => navigate("/attendances/new")}>+ Add Attendance</Button>
      </div>

      {attendances.map((attendance) => (
        <Card key={attendance.attendance_id} className="mb-4">
          <CardHeader>
            <CardTitle>Attendance #{attendance.attendance_id}</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>Student ID:</strong> {attendance.student_id}</p>
            <p><strong>Absences:</strong> {attendance.absences}</p>
            <p><strong>Professor Subject ID:</strong> {attendance.professor_subject_id}</p>

            <div className="flex gap-2 mt-3">
              <Button onClick={() => navigate(`/attendances/${attendance.attendance_id}/edit`)}>
                Edit
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDelete(attendance.attendance_id)}
              >
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AttendancePage;
