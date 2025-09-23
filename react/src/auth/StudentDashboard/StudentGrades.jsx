import { useState, useEffect } from "react";
import axiosClient from "../../axios.js";
import { useStateContext } from "../../Contexts/ContextProvider.jsx";

const StudentGrades = () => {
  const { user, token } = useStateContext();
  const [student, setStudent] = useState(null);
  const [grades, setGrades] = useState([]);
  const [Average, setAverage] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch logged-in student
  useEffect(() => {
    if (user?.id) {
      fetchStudent();
      fetchGrades();
    }
  }, [user]);

  const fetchStudent = async () => {
    try {
      const response = await axiosClient.get(`/students/user/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStudent(response.data.data);
    } catch (error) {
      console.error("Error fetching student:", error);
    }
  };

  const fetchGrades = async () => {
  try {
    const response = await axiosClient.get("/my_grades", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setGrades(response.data.data || []);
    setAverage(response.data.average);
  } catch (error) {
    console.error("Error fetching grades:", error.response || error);
  } finally {
    setLoading(false);
  }
};

  if (loading) return <div>Loading grades...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Grades</h1>

      {!student && <p>Loading student info...</p>}

      {grades.length === 0 ? (
        <p>No grades available yet.</p>
      ) : (
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Subject</th>
              <th className="border px-4 py-2">Professor</th>
              <th className="border px-4 py-2">Grade</th>
              <th className="border px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
  {grades.map((g) => (
    <tr key={g.grade_id} className="text-center">
      <td className="border px-4 py-2">{g.professor_subject?.subject_name}</td>
      <td className="border px-4 py-2">
        {g.professor_subject?.professor_firstname} {g.professor_subject?.professor_lastname}
      </td>
      <td className="border px-4 py-2">{g.grade}</td>
      <td className="border px-4 py-2">
        {g.updated_at ? new Date(g.updated_at).toLocaleDateString() : "-"}
      </td>
    </tr>
  ))}
</tbody>
 {Average !== null && (
    <tfoot>
      <tr className="font-bold bg-gray-50 text-center">
        <td colSpan="2" className="border px-4 py-2">Average</td>
        <td className="border px-4 py-2">{Average.toFixed(2)}</td>
        <td className="border px-4 py-2"></td>
      </tr>
    </tfoot>
  )}
        </table>
      )}
    </div>
  );
};

export default StudentGrades;
