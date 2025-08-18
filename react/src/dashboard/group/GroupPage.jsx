import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../axios.js";

const GroupPage = () => {
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  const fetchGroups = async () => {
    try {
      const res = await axiosClient.get("/groups");
      setGroups(res.data.data); // API resource returns "data"
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this group?")) {
      try {
        await axiosClient.delete(`/groups/${id}`);
        fetchGroups();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Groups</h2>
        <Button onClick={() => navigate("/groups/new")}>Add Group</Button>
      </div>

      <table className="w-full border border-border rounded-lg">
        <thead>
          <tr className="bg-muted-foreground/10">
            <th className="p-2 border-b">Group Name</th>
            <th className="p-2 border-b">Semester</th>
            <th className="p-2 border-b">Created At</th>
            <th className="p-2 border-b">Updated At</th>
            <th className="p-2 border-b">Actions</th>
            
          </tr>
        </thead>
        <tbody>
          {groups.map((g) => (
            <tr key={g.group_id} className="hover:bg-accent/10">
              <td className="p-2 border-b">{g.group}</td>
              <td className="p-2 border-b">{g.semester ?? g.semester_id}</td>
              <td className="p-2 border-b">{new Date(g.created_at).toLocaleDateString()}</td>
              <td className="p-2 border-b">{new Date(g.updated_at).toLocaleDateString()}</td>
              <td className="p-2 border-b flex gap-2">
                <Button size="sm" onClick={() => navigate(`/groups/edit/${g.group_id}`)}>
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(g.group_id)}
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

export default GroupPage;
