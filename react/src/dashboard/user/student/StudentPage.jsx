import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../../axios.js";

const StudentPage = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  const fetchStudents = async () => {
    try {
      const res = await axiosClient.get("/students");
      setStudents(res.data.data || res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this Student?")) {
      try {
        await axiosClient.delete(`/students/${id}`);
        fetchStudents();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Professors</h2>
        <Button onClick={() => navigate("/students/new")}>Add Student</Button>
      </div>

      <table className="w-full border border-border rounded-lg">
        <thead>
        <tr className="bg-muted-foreground/10">
            <th className="p-2 border-b">Student ID</th>
            <th className="p-2 border-b">User ID</th>
            <th className="p-2 border-b">Name</th>
            <th className="p-2 border-b">Email</th>
            <th className="p-2 border-b">ID Card Number</th>
            <th className="p-2 border-b">Group</th>
            <th className="p-2 border-b">Generation</th>
            <th className="p-2 border-b">Caretaker Name</th>
            <th className="p-2 border-b">Caretaker Phone</th>
            <th className="p-2 border-b">Conduct Grade</th>
            <th className="p-2 border-b">Created At</th>
            <th className="p-2 border-b">Actions</th>
        </tr>
        </thead>
        <tbody>
          {students.map((stud) => (
            <tr key={stud.student_id} className="hover:bg-accent/10">
              <td className="p-2 border-b">{stud.student_id}</td>
              <td className="p-2 border-b">{stud.user_id}</td>
              <td className="p-2 border-b">{stud.user?.firstname}</td>
              <td className="p-2 border-b">{stud.user?.email}</td>
              <td className="p-2 border-b">{stud.id_card_number}</td>
              <td className="p-2 border-b">{stud.group?.name}</td>
              <td className="p-2 border-b">{stud.generation?.name}</td>
              <td className="p-2 border-b">{stud.caretaker_name}</td>
              <td className="p-2 border-b">{stud.caretaker_phone}</td>
              <td className="p-2 border-b">{stud.conduct_grade}</td>  
              <td className="p-2 border-b">{new Date(stud.created_at).toLocaleDateString()}</td>
              <td className="p-2 border-b flex gap-2">
                <Button
                  size="sm"
                  onClick={() => navigate(`/students/edit/${stud.student_id}`)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(stud.student_id)}
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

export default StudentPage;
