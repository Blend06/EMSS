import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../axios.js";

const GenerationPage = () => {
  const [Generations, setGenerations] = useState([]);
  const navigate = useNavigate();

  const fetchGenerations = async () => {
    try {
      const res = await axiosClient.get("/generations");
      setGenerations(res.data.data || res.data);
    } catch (error) {
      console.error("Failed to fetch Generations:", error);
    }
  };

  useEffect(() => {
    fetchGenerations();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this Generation?")) return;
    try {
      await axiosClient.delete(`/generations/${id}`);
      fetchGenerations();
    } catch (error) {
      console.error("Failed to delete Generation:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Generations</h2>
        <Button onClick={() => navigate("/generations/new")}>Add Generation</Button>
      </div>

      <table className="w-full border border-border rounded-lg">
        <thead>
          <tr className="bg-muted-foreground/10">
            <th className="p-2 border-b">ID</th>
            <th className="p-2 border-b">Generation</th>
            <th className="p-2 border-b">Created At</th>
            <th className="p-2 border-b">Updated At</th>
            <th className="p-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Generations.map((Generation) => (
            <tr key={Generation.Generation_id} className="hover:bg-accent/10">
              <td className="p-2 border-b">{Generation.generation_id}</td>
              <td className="p-2 border-b">{Generation.generation}</td>
              <td className="p-2 border-b">{new Date(Generation.created_at).toLocaleDateString()}</td>
              <td className="p-2 border-b">{new Date(Generation.updated_at).toLocaleDateString()}</td>
              <td className="p-2 border-b flex gap-2">
                <Button size="sm" onClick={() => navigate(`/generations/edit/${Generation.generation_id}`)}>
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(Generation.generation_id)}
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

export default GenerationPage;
