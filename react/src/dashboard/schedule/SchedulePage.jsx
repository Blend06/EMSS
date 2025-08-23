import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import axiosClient from "../../axios";

const SchedulePage = () => {
  const [schedules, setSchedules] = useState([]);
  const navigate = useNavigate();

  const fetchSchedules = async () => {
    try {
      const res = await axiosClient.get("/schedules");
      setSchedules(res.data.data || res.data);
    } catch (error) {
      console.error("Failed to fetch schedules:", error);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this Schedule?")) {
      try {
        await axiosClient.delete(`/schedules/${id}`);
        fetchSchedules();
      } catch (error) {
        console.error("Failed to delete schedule:", error);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Schedules</h2>
        <Button onClick={() => navigate("/schedules/new")}>Add Schedule</Button>
      </div>

      <table className="w-full border border-border rounded-lg">
        <thead>
          <tr className="bg-muted-foreground/10">
            <th className="p-2 border-b">Schedule ID</th>
            <th className="p-2 border-b">Time</th>
            <th className="p-2 border-b">Day</th>
            <th className="p-2 border-b">Group</th>
            <th className="p-2 border-b">Class</th>
            <th className="p-2 border-b">Professor Subject</th>
            <th className="p-2 border-b">Created At</th>
            <th className="p-2 border-b">Updated At</th>
            <th className="p-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((s) => (
            <tr key={s.schedule_id} className="hover:bg-accent/10">
              <td className="p-2 border-b">{s.schedule_id}</td>
              <td className="p-2 border-b">{s.time}</td>
              <td className="p-2 border-b">{s.day}</td>
              <td className="p-2 border-b">{s.group?.group}</td>
              <td className="p-2 border-b">{s.class?.name}</td>
              <td className="p-2 border-b">
                {s.professor_subject
                  ? `${s.professor_subject.professor_firstname} ${s.professor_subject.professor_lastname} - ${s.professor_subject.subject_name}`
                  : s.professor_subject_id}
              </td>
              <td className="p-2 border-b">
                {new Date(s.created_at).toLocaleDateString()}
              </td>
              <td className="p-2 border-b">
                {new Date(s.updated_at).toLocaleDateString()}
              </td>
              <td className="p-2 border-b flex gap-2">
                <Button
                  size="sm"
                  onClick={() => navigate(`/schedules/edit/${s.schedule_id}`)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(s.schedule_id)}
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

export default SchedulePage;
