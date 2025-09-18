import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../axios.js";

const AttendancePage = () => {
  const [attendances, setAttendances] = useState([]);
  const navigate = useNavigate();

  const fetchAttendances = async () => {
    try {
      const res = await axiosClient.get("/attendances");
      setAttendances(res.data.data || res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Failed to fetch attendances:", error);
    }
  };

  useEffect(() => {
    fetchAttendances();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this attendance?")) return;
    try {
      await axiosClient.delete(`/attendances/${id}`);
      fetchAttendances(); // refresh list
    } catch (error) {
      console.error("Failed to delete attendance", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Attendances</h2>
        <Button onClick={() => navigate("/attendances/new")}>
          + Add Attendance
        </Button>
      </div>

      <table className="w-full border border-border rounded-lg">
        <thead>
          <tr className="bg-muted-foreground/10">
            <th className="p-2 border-b">ID</th>
            <th className="p-2 border-b">Absences </th>
            <th className="p-2 border-b">Student</th>
            <th className="p-2 border-b">Professor</th>
             <th className="p-2 border-b">Subject</th>
            <th className="p-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {attendances.map((attendance) => (
            <tr key={attendance.attendance_id} className="hover:bg-accent/10">
              <td className="p-2 border-b">{attendance.attendance_id}</td>
              <td className="p-2 border-b">{attendance.absences}</td>
              <td className="p-2 border-b">
  {attendance.student?.firstname} {attendance.student?.lastname}
</td>
<td className="p-2 border-b">
  {attendance.professor_subject?.professor_firstname}{" "}
  {attendance.professor_subject?.professor_lastname}
</td>
<td className="p-2 border-b">
  {attendance.professor_subject?.subject_name}
</td>
              <td className="p-2 border-b flex gap-2">
                <Button
                  size="sm"
                  onClick={() =>
                    navigate(`/attendances/${attendance.attendance_id}/edit`)
                  }
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(attendance.attendance_id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendancePage;
