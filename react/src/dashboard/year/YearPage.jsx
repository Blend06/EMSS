import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../axios.js";

const YearPage = () => {
  const [years, setYears] = useState([]);
  const navigate = useNavigate();

  const fetchYears = async () => {
    try {
      const res = await axiosClient.get("/years");
      setYears(res.data.data || res.data);
    } catch (error) {
      console.error("Failed to fetch years:", error);
    }
  };

  useEffect(() => {
    fetchYears();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this year?")) return;
    try {
      await axiosClient.delete(`/years/${id}`);
      fetchYears();
    } catch (error) {
      console.error("Failed to delete year:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Academic Years</h2>
        <Button onClick={() => navigate("/years/new")}>Add Year</Button>
      </div>

      <table className="w-full border border-border rounded-lg">
        <thead>
          <tr className="bg-muted-foreground/10">
            <th className="p-2 border-b">ID</th>
            <th className="p-2 border-b">Academic Year</th>
            <th className="p-2 border-b">Created At</th>
            <th className="p-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {years.map((year) => (
            <tr key={year.year_id} className="hover:bg-accent/10">
              <td className="p-2 border-b">{year.year_id}</td>
              <td className="p-2 border-b">{year.academic_year}</td>
              <td className="p-2 border-b">{new Date(year.created_at).toLocaleDateString()}</td>
              <td className="p-2 border-b flex gap-2">
                <Button size="sm" onClick={() => navigate(`/years/edit/${year.year_id}`)}>
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(year.year_id)}
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

export default YearPage;
