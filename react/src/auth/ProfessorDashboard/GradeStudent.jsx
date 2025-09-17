import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../../axios.js";
import { Button } from "@/components/ui/button";

const GradeStudent = () => {
  const { professorsubjectId } = useParams();
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ student_id: "", grade: "" });
  const [errors, setErrors] = useState({});
  const [gradedStudents, setGradedStudents] = useState([]);

  // fetch all students for the select
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axiosClient.get(`/students`);
        setStudents(response.data.data || []);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, []);

  // fetch graded students for this professor_subject_id
  useEffect(() => {
    const fetchGradedStudents = async () => {
      try {
        const res = await axiosClient.get(`/grades/${professorsubjectId}`);
        setGradedStudents(res.data.data || []);
      } catch (err) {
        console.error("Error fetching graded students:", err);
      }
    };
    fetchGradedStudents();
  }, [professorsubjectId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const payload = {
      student_id: formData.student_id,
      grade: formData.grade,
      professor_subject_id: professorsubjectId,
    };

    try {
      await axiosClient.post("/grades", payload);
      // reset form
      setFormData({ student_id: "", grade: "" });
      // refresh graded students list
      const res = await axiosClient.get(`/grades/${professorsubjectId}`);
      setGradedStudents(res.data.data || []);
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        console.error("Error saving grade:", error);
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">Add Grade</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Student select */}
        <div>
          <label className="block mb-1 font-medium">Student</label>
          <select
            name="student_id"
            value={formData.student_id}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            required
          >
            <option value="">-- Select a student --</option>
            {students.map((s) => {
              const first =
                s.user?.firstname ||
                s.user?.first_name ||
                s.firstname ||
                s.first_name;
              const last =
                s.user?.lastname ||
                s.user?.last_name ||
                s.lastname ||
                s.last_name;
              const label =
                [first, last].filter(Boolean).join(" ") ||
                `ID ${s.student_id}`;
              return (
                <option key={s.student_id} value={s.student_id}>
                  {label}
                </option>
              );
            })}
          </select>
          {errors.student_id && (
            <p className="text-red-500 text-sm">{errors.student_id[0]}</p>
          )}
        </div>

        {/* Grade input */}
        <div>
          <label className="block mb-1 font-medium">Grade (1.00–5.00)</label>
          <input
            type="number"
            step="0.01"
            min="1"
            max="5"
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            placeholder="e.g. 4.25"
            required
          />
          {errors.grade && (
            <p className="text-red-500 text-sm">{errors.grade[0]}</p>
          )}
        </div>

        <Button type="submit">Save</Button>
      </form>

      {/* Table of graded students */}
      {gradedStudents.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-bold mb-2">Graded Students</h3>
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-3 py-2 text-left">Student</th>
                <th className="border px-3 py-2 text-left">Grade</th>
              </tr>
            </thead>
            <tbody>
              {gradedStudents.map((g, idx) => {
                const first = g.student?.user?.firstname || g.student?.firstname || g.firstname;
                const last = g.student?.user?.lastname || g.student?.lastname || g.lastname;

          return (
              <tr
              key={g.id ?? `${g.student_id}-${g.professor_subject_id}-${idx}`}
              >
              <td className="border px-3 py-2">
              {[first, last].filter(Boolean).join(" ")}
              </td>
              <td className="border px-3 py-2">{g.grade}</td>
              </tr>
              );
              })}
          </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GradeStudent;
