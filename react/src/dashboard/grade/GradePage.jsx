import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../axios.js";

const GradePage = () => {
  const [grades, setGrades] = useState([]);
  const [professorSubjects, setProfessorSubjects] = useState([]);
  const [students, setStudents] = useState([]);

  const navigate = useNavigate();

  // ---- Fetchers ----
  const fetchStudents = async () => {
    try {
      const res = await axiosClient.get("/students", { params: { per_page: 1000 } });
      const data = res.data?.data ?? res.data ?? [];
      setStudents(Array.isArray(data) ? data : []);
    } catch {
      console.error("Failed to fetch students");
    }
  };

  const fetchProfessorSubjects = async () => {
    try {
      const res = await axiosClient.get("/professors_subjects", { params: { per_page: 1000 } });
      const data = res.data?.data ?? res.data ?? [];
      setProfessorSubjects(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch professor-subjects:", error);
    }
  };

  const fetchGrades = async () => {
    try {
      const res = await axiosClient.get("/grades", { params: { per_page: 1000 } });
      const data = res.data?.data ?? res.data ?? [];
      setGrades(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch grades:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchProfessorSubjects();
    fetchGrades();
  }, []);

  // ---- Maps (normalize keys to strings to avoid 1 vs "1") ----
  const studentMap = useMemo(() => {
    const m = {};
    students.forEach((s) => (m[String(s.student_id)] = s));
    return m;
  }, [students]);

  const psMap = useMemo(() => {
    const m = {};
    professorSubjects.forEach((ps) => (m[String(ps.professor_subject_id)] = ps));
    return m;
  }, [professorSubjects]);

  // ---- Labels ----
  const renderStudentLabel = (g) => {
    const s = studentMap[String(g.student_id)];
    if (!s) return g.student_id ?? "—";

    // names often live under the related user
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
    const name = [first, last].filter(Boolean).join(" ");
    return name || s.user?.name || `ID ${s.student_id}`;
  };

  const renderPsLabel = (g) => {
    const ps = psMap[String(g.professor_subject_id)];
    if (!ps) return g.professor_subject_id ?? "—";

    const pf = ps.professor_firstname ?? ps.professor?.firstname ?? ps.professor?.first_name;
    const pl = ps.professor_lastname ?? ps.professor?.lastname ?? ps.professor?.last_name;
    const prof = [pf, pl].filter(Boolean).join(" ");
    const subj = ps.subject_name ?? ps.subject?.name ?? ps.subject?.title;
    return [prof, subj].filter(Boolean).join(" – ");
  };

  // ---- Delete ----
  const handleDelete = async (gradeId) => {
    if (!window.confirm("Are you sure you want to delete this grade?")) return;
    try {
      await axiosClient.delete(`/grades/${gradeId}`);
      fetchGrades();
    } catch (error) {
      console.error("Failed to delete grade:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Grades</h2>
        <Button onClick={() => navigate("/grades/new")}>Add Grade</Button>
      </div>

      <table className="w-full border border-border rounded-lg">
        <thead>
          <tr className="bg-muted-foreground/10">
            <th className="p-2 border-b text-left">Student</th>
            <th className="p-2 border-b text-left">Professor–Subject</th>
            <th className="p-2 border-b text-left">Grade</th>
            <th className="p-2 border-b text-left">Date</th>
            <th className="p-2 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {grades.length === 0 ? (
            <tr>
              <td className="p-4 text-center" colSpan={5}>
                No grades found.
              </td>
            </tr>
          ) : (
            grades.map((g) => (
              <tr key={g.grade_id} className="hover:bg-accent/10">
                <td className="p-2 border-b">{renderStudentLabel(g)}</td>
                <td className="p-2 border-b">{renderPsLabel(g)}</td>
                <td className="p-2 border-b">{g.grade ?? "—"}</td>
                <td className="p-2 border-b">
                  {g.date ? new Date(g.date).toLocaleDateString() : "—"}
                </td>
                <td className="p-2 border-b">
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => navigate(`/grades/edit/${g.grade_id}`)}>
                      Edit
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(g.grade_id)}>
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GradePage;
