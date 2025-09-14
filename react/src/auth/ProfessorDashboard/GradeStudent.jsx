import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../../axios.js";
import { Button } from "@/components/ui/button";

const GradeStudent = () => {
  const { professorsubjectId } = useParams();
  const [students, setStudent] = useState([]);
  const [formData, setFormData] = useState({ student_id: "", grade: "" });
  const [errors, setErrors] = useState({});

  // fetchStudents logic stays the same
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axiosClient.get(`/students`);
        setStudent(response.data.data || []);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent default form submission
    setErrors({}); // clear previous errors

    const payload = {
      student_id: formData.student_id,
      grade: formData.grade,
      professor_subject_id: professorsubjectId, // from URL params
    };

    try {
      const response = await axiosClient.post("/grades", payload);
      console.log("Grade saved:", response.data);
      // optionally reset form
      setFormData({ student_id: "", grade: "" });
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors); // validation errors from backend
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
              const first = s.user?.firstname || s.user?.first_name || s.firstname || s.first_name;
              const last = s.user?.lastname || s.user?.last_name || s.lastname || s.last_name;
              const label = [first, last].filter(Boolean).join(" ") || `ID ${s.student_id}`;
              return (
                <option key={s.student_id} value={s.student_id}>
                  {label}
                </option>
              );
            })}
          </select>
          {errors.student_id && <p className="text-red-500 text-sm">{errors.student_id[0]}</p>}
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
          {errors.grade && <p className="text-red-500 text-sm">{errors.grade[0]}</p>}
        </div>

        <Button type="submit">Save</Button>
      </form>
    </div>
  );
};

export default GradeStudent;
