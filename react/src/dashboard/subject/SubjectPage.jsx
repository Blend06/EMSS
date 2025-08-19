import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../axios.js";

const SubjectPage = () => {
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();

  const fetchSubjects = async () => {
    try {
      const res = await axiosClient.get("/subjects");
      setSubjects(res.data?.data || res.data || []);
    } catch (error) {
      console.error("Failed to fetch subjects:", error);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this Subject?")) return;
    try {
      await axiosClient.delete(`/subjects/${id}`);
      fetchSubjects();
    } catch (error) {
      console.error("Failed to delete Subject:", error);
    }
  };

  const apiBase = (axiosClient.defaults.baseURL || "").replace(/\/$/, "");
  const linkFromPath = (path) => {
    if (!path) return null;
    if (/^https?:\/\//i.test(path)) return path;
    return `${apiBase}/${
      path.startsWith("storage/") ? path : `storage/${path.replace(/^\/+/, "")}`
    }`;
  };

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Subjects</h2>
        <Button onClick={() => navigate("/subjects/new")}>Add Subject</Button>
      </div>

      <table className="w-full border border-border rounded-lg">
        <thead>
          <tr className="bg-muted-foreground/10">
            <th className="p-2 border-b">ID</th>
            <th className="p-2 border-b">Name</th>
            <th className="p-2 border-b">Syllabus</th>
            <th className="p-2 border-b">Created At</th>
            <th className="p-2 border-b">Updated At</th>
            <th className="p-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((s) => {
            const rawPath = s.syllabus_file_path || s.syllabus_file; // prefer new key, fallback old
            const href = linkFromPath(rawPath);
            return (
              <tr key={s.subject_id} className="hover:bg-accent/10">
                <td className="p-2 border-b">{s.subject_id}</td>
                <td className="p-2 border-b">{s.name}</td>
                <td className="p-2 border-b">
                  {href ? (
                    <a className="underline" href={href} target="_blank" rel="noreferrer" download>
                      View
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="p-2 border-b">
                  {s.created_at ? new Date(s.created_at).toLocaleDateString() : "-"}
                </td>
                <td className="p-2 border-b">
                  {s.updated_at ? new Date(s.updated_at).toLocaleDateString() : "-"}
                </td>
                <td className="p-2 border-b flex gap-2">
                  <Button size="sm" onClick={() => navigate(`/subjects/edit/${s.subject_id}`)}>
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(s.subject_id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
          {subjects.length === 0 && (
            <tr>
              <td className="p-4 text-center text-sm text-muted-foreground" colSpan={6}>
                No subjects found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SubjectPage;
