// src/auth/StudentDashboard/StudentSchedule.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../../axios.js";

const StudentSchedule = () => {
  const { groupId } = useParams();
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setErr("");
        setLoading(true);

        const url = `/schedules${groupId ? `?group_id=${groupId}` : ""}`;
        console.log("Fetching:", url); 
        const res = await axiosClient.get(url); 
        setSchedules(res.data?.data || res.data || []);
      } catch (e) {
        console.error("Error fetching schedule:", e); 
        const status = e?.response?.status;
        setErr(
          status === 404
            ? "404: /schedules not found. Check your API route."
            : status === 401
            ? "401: Unauthorized. Check your token / auth."
            : "Failed to load schedules."
        );
      } finally {
        setLoading(false);
      }
    })();
  }, [groupId]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (err) return <div className="p-6 text-red-600">{err}</div>;

  if (!schedules.length) {
    return (
      <div className="p-6">
        {groupId ? "No schedules found for this group." : "No schedules available."}
      </div>
    );
  }

  const prettyDay = (d) => (d ? d[0].toUpperCase() + d.slice(1) : d);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">
        {groupId ? `Schedule for Group ${groupId}` : "Schedule"}
      </h1>

      <table className="w-full border border-border rounded-lg">
        <thead>
          <tr className="bg-muted-foreground/10">
            <th className="p-2 border-b text-left">Day</th>
            <th className="p-2 border-b text-left">Time</th>
            <th className="p-2 border-b text-left">Classroom</th>
            <th className="p-2 border-b text-left">Subject</th>
            <th className="p-2 border-b text-left">Professor</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((s) => {
            const subject = s?.professor_subject?.subject_name ?? "";
            const profFirst = s?.professor_subject?.professor_firstname ?? "";
            const profLast = s?.professor_subject?.professor_lastname ?? "";
            const professor = (profFirst || profLast) ? `${profFirst} ${profLast}`.trim() : "";
            const room = s?.class?.name ?? "";

            return (
              <tr key={s.schedule_id} className="hover:bg-accent/10">
                <td className="p-2 border-b">{prettyDay(s.day)}</td>
                <td className="p-2 border-b">{s.time}</td>
                <td className="p-2 border-b">{room}</td>
                <td className="p-2 border-b">{subject}</td>
                <td className="p-2 border-b">{professor}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StudentSchedule;
