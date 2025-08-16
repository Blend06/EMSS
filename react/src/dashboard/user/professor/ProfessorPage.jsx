import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../../axios.js";

const ProfessorPage = () => {
  const [professors, setProfessors] = useState([]);
  const navigate = useNavigate();

  const fetchProfessors = async () => {
    try {
      const res = await axiosClient.get("/professors");
      // If using Laravel resources, data is usually inside res.data.data
      setProfessors(res.data.data || res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProfessors();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this Professor?")) {
      try {
        await axiosClient.delete(`/professors/${id}`);
        fetchProfessors();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Professors</h2>
        <Button onClick={() => navigate("/professors/new")}>Add Professor</Button>
      </div>

      <table className="w-full border border-border rounded-lg">
        <thead>
          <tr className="bg-muted-foreground/10">
            <th className="p-2 border-b">Professor ID</th>
            <th className="p-2 border-b">User ID</th>
            <th className="p-2 border-b">Name</th>
            <th className="p-2 border-b">Email</th>
            <th className="p-2 border-b">Created At</th>
            <th className="p-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {professors.map((prof) => (
            <tr key={prof.professor_id} className="hover:bg-accent/10">
              <td className="p-2 border-b">{prof.professor_id}</td>
              <td className="p-2 border-b">{prof.user_id}</td>
              <td className="p-2 border-b">{prof.user?.firstname}</td>
              <td className="p-2 border-b">{prof.user?.email}</td>
              <td className="p-2 border-b">{new Date(prof.created_at).toLocaleDateString()}</td>
              <td className="p-2 border-b flex gap-2">
                <Button
                  size="sm"
                  onClick={() => navigate(`/professors/edit/${prof.professor_id}`)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(prof.professor_id)}
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

export default ProfessorPage;
