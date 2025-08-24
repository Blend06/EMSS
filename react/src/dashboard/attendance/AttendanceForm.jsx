import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../axios.js";

const AttendanceForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const userTouched = useRef(false); // prevent overwriting form after user edits

  const [attendance, setAttendance] = useState({
    student_id: "",
    absences: "",
    professor_subject_id: "",
  });

  const [students, setStudents] = useState([]);
  const [professorSubjects, setProfessorSubjects] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(!!id);

  const fetchStudents = async () => {
    try {
      const res = await axiosClient.get("/students");
      setStudents(res.data?.data ?? res.data ?? []);
    } catch (error) {
      console.error("Failed to fetch students:", error);
    }
  };

  const fetchProfessorSubjects = async () => {
    try {
      const res = await axiosClient.get("/professors_subjects");
      setProfessorSubjects(res.data?.data ?? res.data ?? []);
    } catch (error) {
      console.error("Failed to fetch professor subjects:", error);
    }
  };

  const fetchAttendance = async () => {
    if (!id) return;
    try {
      const res = await axiosClient.get(`/attendances/${id}`);
      const data = res.data?.data ?? res.data ?? {};
      if (!userTouched.current) {
        setAttendance({
          student_id: data.student_id ?? "",
          absences: data.absences ?? "",
          professor_subject_id: data.professor_subject_id ?? "",
        });
      }
    } catch (error) {
      console.error("Failed to fetch attendance:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchProfessorSubjects();
    fetchAttendance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

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
    setErrors({});
    try {
      if (id) {
        await axiosClient.put(`/attendances/${id}`, attendance);
      } else {
        await axiosClient.post("/attendances", attendance);
      }
      navigate("/attendances");
    } catch (error) {
      console.error("Failed to save attendance:", error);
      setErrors(error.response?.data?.errors ?? {});
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">{id ? "Edit" : "Add"} Attendance</h2>

      {loading ? (
        <p>Loading…</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Student Dropdown */}
          <div>
            <Label>Student</Label>
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
            {errors.student_id && <p className="text-red-500 text-sm mt-1">{errors.student_id[0]}</p>}
          </div>

          {/* Absences */}
          <div>
            <Label>Absences</Label>
            <input
              type="number"
              name="absences"
              value={attendance.absences}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
              required
            />
            {errors.absences && <p className="text-red-500 text-sm mt-1">{errors.absences[0]}</p>}
          </div>

          {/* Professor Subject Dropdown */}
          <div>
            <Label>Professor–Subject</Label>
            <select
              name="professor_subject_id"
              value={attendance.professor_subject_id}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
              required
            >
              <option value="">-- Select Professor Subject --</option>
              {professorSubjects
                .filter((ps) => ps?.professor_firstname && ps?.subject_name)
                .map((ps) => (
                  <option key={ps.professor_subject_id} value={ps.professor_subject_id}>
                    {ps.professor_firstname} {ps.professor_lastname} – {ps.subject_name}
                  </option>
                ))}
            </select>
            {errors.professor_subject_id && (
              <p className="text-red-500 text-sm mt-1">{errors.professor_subject_id[0]}</p>
            )}
          </div>

          <div className="flex gap-2">
            <Button type="submit">{id ? "Update" : "Create"}</Button>
            <Button type="button" variant="secondary" onClick={() => navigate("/attendances")}>
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AttendanceForm;
