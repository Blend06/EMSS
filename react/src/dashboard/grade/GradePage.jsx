import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../axios.js";

const LecturePage = () => {
  const [lectures, setLectures] = useState([]);
  const [professorSubjects, setProfessorSubjects] = useState([]);
  const navigate = useNavigate();

  const fetchLectures = async () => {
    try {
      const res = await axiosClient.get("/lectures");
      const data = res.data?.data ?? res.data ?? [];
      setLectures(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch lectures:", error);
    }
  };

  const fetchProfessorSubjects = async () => {
    try {
      const res = await axiosClient.get("/professors_subjects");
      const data = res.data?.data ?? res.data ?? [];
      setProfessorSubjects(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch professor-subjects:", error);
    }
  };

  useEffect(() => {
    fetchLectures();
    fetchProfessorSubjects();
  }, []);

  const psMap = useMemo(() => {
    const m = {};
    professorSubjects.forEach((ps) => (m[ps.professor_subject_id] = ps));
    return m;
  }, [professorSubjects]);

  const handleDelete = async (lectureId) => {
    if (!window.confirm("Are you sure you want to delete this lecture?")) return;
    try {
      await axiosClient.delete(`/lectures/${lectureId}`);
      fetchLectures();
    } catch (error) {
      console.error("Failed to delete lecture:", error);
    }
  };

  const renderPsLabel = (l) => {
    const ps = psMap[l.professor_subject_id];
    if (ps) {
      const prof = [ps.professor_firstname, ps.professor_lastname].filter(Boolean).join(" ");
      return [prof, ps.subject_name].filter(Boolean).join(" – ");
    }
    return l.professor_subject_id ?? "—";
  };

  const buildFileHref = (path) => {
    if (!path) return null;
    if (/^https?:\/\//i.test(path) || path.startsWith("/")) return path;
    if (/^file:\/\//i.test(path)) return path;
    if (/^[a-zA-Z]:\\/.test(path)) return "file:///" + path.replace(/\\/g, "/");
    return path;
  };

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Lectures</h2>
        <Button onClick={() => navigate("/lectures/new")}>Add Lecture</Button>
      </div>

      <table className="w-full border border-border rounded-lg">
        <thead>
          <tr className="bg-muted-foreground/10">
            <th className="p-2 border-b text-left">Title</th>
            <th className="p-2 border-b text-left">Professor–Subject</th>
            <th className="p-2 border-b text-left">File</th>
            <th className="p-2 border-b text-left">Created At</th>
            <th className="p-2 border-b text-left">Updated At</th>
            <th className="p-2 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {lectures.length === 0 ? (
            <tr>
              <td className="p-4 text-center" colSpan={6}>
                No lectures found.
              </td>
            </tr>
          ) : (
            lectures.map((l) => {
              const href = buildFileHref(l.file_path);
              return (
                <tr key={l.lecture_id} className="hover:bg-accent/10">
                  <td className="p-2 border-b">{l.title}</td>
                  <td className="p-2 border-b">{renderPsLabel(l)}</td>
                  <td className="p-2 border-b">
                    {href ? (
                      <a href={href} target="_blank" rel="noreferrer" className="underline">
                        Open
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="p-2 border-b">
                    {l.created_at ? new Date(l.created_at).toLocaleDateString() : "—"}
                  </td>
                  <td className="p-2 border-b">
                    {l.updated_at ? new Date(l.updated_at).toLocaleDateString() : "—"}
                  </td>
                  <td className="p-2 border-b">
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => navigate(`/lectures/edit/${l.lecture_id}`)}>
                        Edit
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(l.lecture_id)}>
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      {/* Optional note for local paths */}
      <p className="text-xs mt-3 opacity-70">
        Note: Links to local <code>file:///</code> paths may be blocked by the browser. Prefer serving
        files via a web path (e.g. <code>/storage/…</code>) or an HTTPS URL.
      </p>
    </div>
  );
};

export default LecturePage;
