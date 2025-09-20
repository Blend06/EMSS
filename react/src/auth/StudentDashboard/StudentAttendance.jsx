import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../../axios.js";



const StudentAttendance = () => {
    const { studentId } = useParams();
    const [attendance, setAttendance] = useState([]);
 

    useEffect(() => {
        const fetchattendances = async () => {
            try {
                const response = await axiosClient.get(
                `/attendances${studentId ? `?student_id=${studentId}` : ""}`
                );
                setAttendance(response.data?.data || response.data || []);
                console.log("attendances", response.data?.data || response.data || []);
            }catch (error) {
                console.error("Error fetching attendance:", error);
            }
        };
        
        fetchattendances();
        
    }, [studentId]);



    return (
        <div className="max-w-6xl mx-auto mt-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Your Attendances</h2>
              </div>
        
              <table className="w-full border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted-foreground/10">
                    <th className="p-2 border-b">Absences </th>
                    <th className="p-2 border-b">Student</th>
                    <th className="p-2 border-b">Professor</th>
                     <th className="p-2 border-b">Subject</th>
                  </tr>
                </thead>
                <tbody>
                  {attendance.map((a) => (
                    <tr key={a.attendance_id} className="hover:bg-accent/10">
                      <td className="p-2 border-b">{a.absences}</td>
                      <td className="p-2 border-b">
          {a.student?.firstname} {a.student?.lastname}
        </td>
        <td className="p-2 border-b">
          {a.professor_subject?.professor_firstname}{" "}
          {a.professor_subject?.professor_lastname}
        </td>
        <td className="p-2 border-b">
          {a.professor_subject?.subject_name}
        </td>
        </tr>
                  ))}
                </tbody>
              </table>
            </div>
    );

}
    export default StudentAttendance;