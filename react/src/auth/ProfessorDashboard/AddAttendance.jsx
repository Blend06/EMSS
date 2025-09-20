import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import axiosClient from "../../axios.js";
import { Button } from "@/components/ui/button";

const AddAttendance = () => {

    const { professorId } = useParams();
    const [professorSubjects, setProfessorSubjects] = useState([]);
    const [students, setStudents] = useState([]);
    const [attendance, setAttendance] = useState({
    student_id: "",
    absences: "",
    professor_subject_id: "",
  });
    const [attendanceStudents, setAttendanceStudents] = useState([]);
    const userTouched = useRef(false);

    useEffect(() => {
        const fetchProfessorSubjects = async () => {
            try {
                const response = await axiosClient.get(`/professors_subjects?professor_id=${professorId}`)
                setProfessorSubjects(response.data.data|| []);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching professor subjects:", error);
            }
        };
        fetchProfessorSubjects();
    }, [professorId]);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axiosClient.get(`/students`)
                setStudents(response.data.data|| []);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching students:", error);
            }
        };
        fetchStudents();
    }, []);

   const fetchAttendances = async () => {
  if (professorSubjects.length > 0) {
    try {
      const ids = professorSubjects.map(ps => ps.professor_subject_id).join(",");
      const response = await axiosClient.get(`/attendances?professor_subject_ids=${ids}`);
      setAttendanceStudents(response.data.data || []);
    } catch (error) {
      console.error("Error fetching attendances:", error);
    }
  }
};

useEffect(() => {
  fetchAttendances();
}, [professorSubjects]);

    const handleChange = (e) => {
    userTouched.current = true;
    const { name, value } = e.target;
    setAttendance((prev) => ({
      ...prev,
      [name]: name === "student_id" || name === "professor_subject_id" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await axiosClient.post("/attendances", attendance);
    await fetchAttendances();
     setAttendance({
      student_id: "",
      absences: "",
      professor_subject_id: "",
    });
    userTouched.current = false;
  } catch (error) {
    console.error("Failed to save attendance:", error);
  }
};

const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this attendance?")) return;
    try {
      await axiosClient.delete(`/attendances/${id}`);
      await fetchAttendances(); // refresh list
    } catch (error) {
      console.error("Failed to delete attendance", error);
    }
  };


    return (
        <div className="max-w-lg mx-auto mt-8">
           <h2 className="text-xl font-bold mb-4">Add Attendance</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Student Dropdown */}
          <div>
            <label className="block mb-1 font-medium">Student</label>
            <select
              name="student_id"
              value={attendance.student_id}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
              required
            >
              <option value="">-- Select Student --</option>
              {students
                .filter((s) => s?.user)
                .map((student) => (
                  <option key={student.student_id} value={student.student_id}>
                    {student.user.firstname} {student.user.lastname}
                  </option>
                ))}
            </select>
          </div>

          {/* Absences */}
          <div>
            <label className="block mb-1 font-medium">Absences</label>
            <input
              type="number"
              name="absences"
              value={attendance.absences}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
              required
            />
          </div>

          {/* Professor Subject Dropdown */}
          <div>
            <label className="block mb-1 font-medium">Subject</label>
            <select
              name="professor_subject_id"
              value={attendance.professor_subject_id}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
              required
            >
              <option value="">-- Select Subject --</option>
              {professorSubjects
                .filter((ps) => ps?.professor_firstname && ps?.subject_name)
                .map((ps) => (
                  <option key={ps.professor_subject_id} value={ps.professor_subject_id}>
                   {ps.subject_name}
                  </option>
                ))}
            </select>
          </div>

          <div className="flex gap-2">
            <Button type="submit">Save</Button>
          </div>
        </form>
                <table className="w-full border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted-foreground/10">
                    <th className="p-2 border-b">Absences </th>
                    <th className="p-2 border-b">Student</th>
                    <th className="p-2 border-b">Professor</th>
                     <th className="p-2 border-b">Subject</th>
                     <th></th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceStudents.map((a) => (
                    <tr key={a.attendance_id} className="hover:bg-accent/10">
                      <td className="p-2 border-b">{a.absences}</td>
                      <td className="p-2 border-b">
          {a.student?.firstname} {a.student?.lastname}
        </td>
        <td className="p-2 border-b">
          {a.professor_subject?.professor_firstname}{" "}
          {a.professor_subject?.professor_lastname}
        </td>
        <td className="p-2 border-b">
          {a.professor_subject?.subject_name}
        </td>
        <td><Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(a.attendance_id)}
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
}
export default AddAttendance;