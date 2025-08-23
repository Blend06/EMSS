import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import axiosClient from "../../axios";

const GradeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    student_id: "",
    professor_subject_id: "",
    grade: "",
    // date: "" // <- uncomment if you decide to use date
  });

  const [professorSubjects, setProfessorSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(!!id);

  // --- Fetch lists ---
  const fetchProfessorSubjects = async () => {
    try {
      const res = await axiosClient.get("/professors_subjects", {
        params: { per_page: 1000 },
      });
      const data = res.data?.data ?? res.data ?? [];
      setProfessorSubjects(Array.isArray(data) ? data : []);
    } catch {
      console.error("Failed to fetch professor-subjects");
    }
  };

  const fetchStudents = async () => {
    try {
      const res = await axiosClient.get("/students", {
        params: { per_page: 1000 },
      });
      const data = res.data?.data ?? res.data ?? [];
      setStudents(Array.isArray(data) ? data : []);
    } catch {
      console.error("Failed to fetch students");
    }
  };

  // --- Fetch single grade for edit ---
  const fetchGrade = async () => {
    if (!id) return;
    try {
      const res = await axiosClient.get(`/grades/${id}`);
      const g = res.data?.data ?? res.data ?? {};
      setFormData({
        student_id:
          g.student_id !== undefined && g.student_id !== null
            ? Number(g.student_id)
            : "",
        professor_subject_id:
          g.professor_subject_id !== undefined && g.professor_subject_id !== null
            ? Number(g.professor_subject_id)
            : "",
        grade: g.grade ?? "",
        // date: g.date ?? ""
      });
    } catch (e) {
      console.error("Failed to fetch grade:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchProfessorSubjects();
    fetchGrade();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // --- Handlers ---
  const handleChange = (e) => {
    const { name, value } = e.target;

    let next = value;
    if (
      (name === "student_id" || name === "professor_subject_id") &&
      value !== ""
    ) {
      next = Number(value);
    }

    setFormData((prev) => ({ ...prev, [name]: next }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      if (id) {
        await axiosClient.put(`/grades/${id}`, formData);
      } else {
        await axiosClient.post("/grades", formData);
      }
      navigate("/grades");
    } catch (error) {
      console.error("Failed to save grade:", error);
      const apiErrors = error.response?.data?.errors || {};
      setErrors(apiErrors);
    }
  };

  if (loading) return <div className="p-4">Loading…</div>;

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">
        {id ? "Edit Grade" : "Add Grade"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Student */}
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
              // Most installs store names on the related user
              const first =
                s.user?.firstname ??
                s.user?.first_name ??
                s.firstname ??
                s.first_name ??
                s.user?.name?.split?.(" ")?.[0];
              const last =
                s.user?.lastname ??
                s.user?.last_name ??
                s.lastname ??
                s.last_name ??
                s.user?.name?.split?.(" ")?.slice(1).join(" ");
              const label =
                [first, last].filter(Boolean).join(" ") ||
                s.user?.name ||
                `ID ${s.student_id}`;

              return (
                <option key={s.student_id} value={s.student_id}>
                  {label}
                </option>
              );
            })}
          </select>
          {errors.student_id && (
            <p className="text-red-500 text-sm mt-1">
              {Array.isArray(errors.student_id)
                ? errors.student_id[0]
                : errors.student_id}
            </p>
          )}
        </div>

        {/* Professor – Subject */}
        <div>
          <label className="block mb-1 font-medium">Professor – Subject</label>
          <select
            name="professor_subject_id"
            value={formData.professor_subject_id}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            required
          >
            <option value="">-- Select --</option>
            {professorSubjects.map((ps) => {
              // Robust label in case your API nests objects
              const pf =
                ps.professor_firstname ??
                ps.professor?.firstname ??
                ps.professor?.first_name;
              const pl =
                ps.professor_lastname ??
                ps.professor?.lastname ??
                ps.professor?.last_name;
              const prof = [pf, pl].filter(Boolean).join(" ");
              const subj = ps.subject_name ?? ps.subject?.name ?? ps.subject?.title;
              const label =
                [prof, subj].filter(Boolean).join(" – ") ||
                `ID ${ps.professor_subject_id}`;

              return (
                <option
                  key={ps.professor_subject_id}
                  value={ps.professor_subject_id}
                >
                  {label}
                </option>
              );
            })}
          </select>
          {errors.professor_subject_id && (
            <p className="text-red-500 text-sm mt-1">
              {Array.isArray(errors.professor_subject_id)
                ? errors.professor_subject_id[0]
                : errors.professor_subject_id}
            </p>
          )}
        </div>

        {/* Grade */}
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
            <p className="text-red-500 text-sm mt-1">
              {Array.isArray(errors.grade) ? errors.grade[0] : errors.grade}
            </p>
          )}
        </div>

        {/* Optional: Date
        <div>
          <label className="block mb-1 font-medium">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          />
          {errors.date && (
            <p className="text-red-500 text-sm mt-1">
              {Array.isArray(errors.date) ? errors.date[0] : errors.date}
            </p>
          )}
        </div> */}

        <div className="flex gap-2">
          <Button type="submit">{id ? "Update" : "Save"}</Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate("/grades")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default GradeForm;
