import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../axios.js";

const SubjectPage = () => {
  const [Subjects, setSubjects] = useState([]);
  const navigate = useNavigate();

  const fetchSubjects = async () => {
    try {
      const res = await axiosClient.get("/subjects");
      setSubjects(res.data.data || res.data);
    } catch (error) {
      console.error("Failed to fetch Subjects:", error);
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
            <th className="p-2 border-b">Subject name</th>
            <th className="p-2 border-b">Syllabus</th>
            <th className="p-2 border-b">Created At</th>
            <th className="p-2 border-b">Updated At</th>
            <th className="p-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Subjects.map((Subject) => (
            <tr key={Subject.Subject_id} className="hover:bg-accent/10">
              <td className="p-2 border-b">{Subject.subject_id}</td>
              <td className="p-2 border-b">{Subject.name}</td>
              <td className="p-2 border-b">{<a href={`/${Subject.syllabus_file_path}`} target="_blank" rel="noopener noreferrer" className="me-3">
                                 view
                                </a>}</td>
              <td className="p-2 border-b">{new Date(Subject.created_at).toLocaleDateString()}</td>
              <td className="p-2 border-b">{new Date(Subject.updated_at).toLocaleDateString()}</td>
              <td className="p-2 border-b flex gap-2">
                <Button size="sm" onClick={() => navigate(`/subjects/edit/${Subject.subject_id}`)}>
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(Subject.Subject_id)}
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

export default SubjectPage;
