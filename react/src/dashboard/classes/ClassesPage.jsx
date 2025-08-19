import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../axios.js";

const ClassesPage = () => {
  const [Classess, setClassess] = useState([]);
  const navigate = useNavigate();

  const fetchClasses = async () => {
    try {
      const res = await axiosClient.get("/classes");
      setClassess(res.data.data || res.data);
    } catch (error) {
      console.error("Failed to fetch Classess:", error);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this Class?")) return;
    try {
      await axiosClient.delete(`/classes/${id}`);
      fetchClasses();
    } catch (error) {
      console.error("Failed to delete Class:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Classes</h2>
        <Button onClick={() => navigate("/classes/new")}>Add Classes</Button>
      </div>

      <table className="w-full border border-border rounded-lg">
        <thead>
          <tr className="bg-muted-foreground/10">
            <th className="p-2 border-b">ID</th>
            <th className="p-2 border-b">Class name</th>
            <th className="p-2 border-b">Created At</th>
            <th className="p-2 border-b">Updated At</th>
            <th className="p-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Classess.map((Classes) => (
            <tr key={Classes.Classes_id} className="hover:bg-accent/10">
              <td className="p-2 border-b">{Classes.class_id}</td>
              <td className="p-2 border-b">{Classes.name}</td>
              <td className="p-2 border-b">{new Date(Classes.created_at).toLocaleDateString()}</td>
              <td className="p-2 border-b">{new Date(Classes.updated_at).toLocaleDateString()}</td>
              <td className="p-2 border-b flex gap-2">
                <Button size="sm" onClick={() => navigate(`/classes/edit/${Classes.class_id}`)}>
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(Classes.class_id)}
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

export default ClassesPage;
