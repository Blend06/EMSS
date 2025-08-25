import { useEffect, useState } from "react";
import axiosClient from "../axios";
import { Button } from "@/components/ui/button";

const PendingStudentsPage = () => {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const res = await axiosClient.get("/students/pending");
      setStudents(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAccept = async (id) => {
    await axiosClient.patch(`/students/${id}/accept`);
    fetchStudents(); // refresh
  };

  const handleReject = async (id) => {
    await axiosClient.patch(`/students/${id}/reject`);
    fetchStudents(); // refresh
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Pending Students</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.student_id}>
              <td className="border px-4 py-2">{s.student_id}</td>
              <td className="border px-4 py-2">{s.user?.firstname} {s.user?.lastname}</td>
              <td className="border px-4 py-2">{s.user?.email}</td>
              <td className="border px-4 py-2 flex gap-2">
                <Button onClick={() => handleAccept(s.student_id)} className="bg-green-500 text-white">
                  Accept
                </Button>
                <Button onClick={() => handleReject(s.student_id)} className="bg-red-500 text-white">
                  Reject
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PendingStudentsPage;
