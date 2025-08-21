import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../axios.js";

const ProfessorSubjectPage = () => {
  const [professorSubjects, setProfessorSubjects] = useState([]);
  const navigate = useNavigate();

  const fetchProfessorSubjects = async () => {
    try {
      const res = await axiosClient.get("/professors_subjects");
      setProfessorSubjects(res.data.data || res.data);
    } catch (error) {
      console.error("Failed to fetch ProfessorSubjects:", error);
    }
  };

  useEffect(() => {
    fetchProfessorSubjects();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this ProfessorSubject?")) return;
    try {
      await axiosClient.delete(`/professors_subjects/${id}`);
      fetchProfessorSubjects();
    } catch (error) {
      console.error("Failed to delete ProfessorSubject:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Professor Subjects</h2>
        <Button onClick={() => navigate("/professor_subjects/new")}>
          Add Professor Subject
        </Button>
      </div>

      <table className="w-full border border-border rounded-lg">
        <thead>
          <tr className="bg-muted-foreground/10">
            <th className="p-2 border-b">ID</th>
            <th className="p-2 border-b">Professor</th>
            <th className="p-2 border-b">Subject</th>
            <th className="p-2 border-b">Created At</th>
            <th className="p-2 border-b">Updated At</th>
            <th className="p-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {professorSubjects.map((ps) => (
            <tr key={ps.professor_subject_id} className="hover:bg-accent/10">
              <td className="p-2 border-b">{ps.professor_subject_id}</td>
              <td className="p-2 border-b">
                {ps.professor_firstname} {ps.professor_lastname}
              </td>
              <td className="p-2 border-b">{ps.subject_name}</td>
              <td className="p-2 border-b">
                {new Date(ps.created_at).toLocaleDateString()}
              </td>
              <td className="p-2 border-b">
                {new Date(ps.updated_at).toLocaleDateString()}
              </td>
              <td className="p-2 border-b flex gap-2">
                <Button
                  size="sm"
                  onClick={() =>
                    navigate(`/professor_subjects/edit/${ps.professor_subject_id}`)
                  }
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(ps.professor_subject_id)}
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

export default ProfessorSubjectPage;
