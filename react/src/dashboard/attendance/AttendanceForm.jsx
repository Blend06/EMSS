import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../axios.js";

const AttendanceForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 

  const [attendance, setAttendance] = useState({
    student_id: "",
    absences: "",
    professor_subject_id: "",
  });

  const [students, setStudents] = useState([]);
  const [professorSubjects, setProfessorSubjects] = useState([]);

  // fetch students and professor_subjects
  useEffect(() => {
    axiosClient.get("/students").then((res) => {
      setStudents(res.data.data); 
    });
    axiosClient.get("/professors_subjects").then((res) => {
      setProfessorSubjects(res.data.data);
    });

    if (id) {
      axiosClient.get(`/attendances/${id}`).then((res) => {
        setAttendance({
          student_id: res.data.data.student_id,
          absences: res.data.data.absences,
          professor_subject_id: res.data.data.professor_subject_id,
        });
      });
    }
  }, [id]);

  const handleChange = (e) => {
    setAttendance({ ...attendance, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axiosClient.put(`/attendances/${id}`, attendance);
      } else {
        await axiosClient.post("/attendances", attendance);
      }
      navigate("/attendances");
    } catch (error) {
      console.error("Failed to save attendance", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4">{id ? "Edit" : "Add"} Attendance</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Student Dropdown */}
        <div>
          <Label>Student</Label>
          <select
            name="student_id"
            value={attendance.student_id}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2"
          >
            <option value="">-- Select Student --</option>
            {students.map((student) => (
              <option key={student.student_id} value={student.student_id}>
                {student.user.firstname} {student.user.lastname}
              </option>
            ))}
          </select>
        </div>

        {/* Absences */}
        <div>
          <Label>Absences</Label>
          <input
            type="number"
            name="absences"
            value={attendance.absences}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2"
          />
        </div>

        {/* Professor Subject Dropdown */}
        <div>
          <Label>Professor Subject</Label>
          <select
            name="professor_subject_id"
            value={attendance.professor_subject_id}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2"
          >
            <option value="">-- Select Professor Subject --</option>
            {professorSubjects.map((ps) => (
              <option key={ps.professor_subject_id} value={ps.professor_subject_id}>
                {ps.professor.name} - {ps.subject.name} 
              </option>
            ))}
          </select>
        </div>

        <Button type="submit" className="w-full">
          {id ? "Update" : "Create"}
        </Button>
      </form>
    </div>
  );
};

export default AttendanceForm;
