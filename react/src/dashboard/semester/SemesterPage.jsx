import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../axios.js";

const SemesterPage = () => {
  const [semester, setSemester] = useState([]);
  const navigate = useNavigate();

  const fetchSemester = async () => {
    try {
      const res = await axiosClient.get("/semester");
console.log(res.data);      setSemester(res.data.data || res.data);
    } catch (error) {
      console.error("Failed to fetch semesters:", error);
    }
  };

  useEffect(() => {
    fetchSemester();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this Semester?")) {
      try {
        await axiosClient.delete(`/semester/${id}`);
        fetchSemester();
      } catch (error) {
        console.error("Failed to delete semester:", error);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Semesters</h2>
        <Button onClick={() => navigate("/semester/new")}>Add Semester</Button>
      </div>

      <table className="w-full border border-border rounded-lg">
        <thead>
          <tr className="bg-muted-foreground/10">
            <th className="p-2 border-b">Semester ID</th>
            <th className="p-2 border-b">Semester Name</th>
            <th className="p-2 border-b">Year</th>
            <th className="p-2 border-b">Created At</th>
            <th className="p-2 border-b">Updated At</th>
            <th className="p-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {semester.map((sem) => (
            <tr key={sem.semester_id} className="hover:bg-accent/10">
              <td className="p-2 border-b">{sem.semester_id}</td>
              <td className="p-2 border-b">{sem.semester}</td>
              <td className="p-2 border-b">
                {sem.year?.academic_year || "N/A"}
              </td>
              <td className="p-2 border-b">
                {new Date(sem.created_at).toLocaleDateString()}
              </td>
              <td className="p-2 border-b">
                {new Date(sem.updated_at).toLocaleDateString()}
              </td>
              <td className="p-2 border-b flex gap-2">
                <Button
                  size="sm"
                  onClick={() =>
                    navigate(`/semester/edit/${sem.semester_id}`)
                  }
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(sem.semester_id)}
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

export default SemesterPage;
