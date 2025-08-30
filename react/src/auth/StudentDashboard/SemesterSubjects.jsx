import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosClient from "../../axios.js";

const profLabel = (p) => {
  const u = p?.user || {};
  const full = [u.firstname, u.lastname].filter(Boolean).join(" ");
  return u.name ?? (full || `Professor #${p.professor_id}`);
};

export default function SemesterSubjects() {
  const { semesterId } = useParams();
  const [subjects, setSubjects] = useState([]);
  const [semesterMeta, setSemesterMeta] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      try {
        const [subsRes, semRes] = await Promise.all([
          axiosClient.get("/subjects", { params: { semester_id: semesterId, with_professors: 1, per_page: 500 } }),
          axiosClient.get(`/semester/${semesterId}`),
        ]);
        setSubjects(subsRes.data?.data || []);
        setSemesterMeta(semRes.data?.data || null);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [semesterId]);

  useEffect(() => {
    if (!loading && window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [loading]);

  if (loading) return <div>Loading…</div>;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          Semester {semesterMeta?.semester} <span className="text-sm text-muted-foreground">#{semesterId}</span>
        </h2>
        <Link to="/student_dashboard/subjects" className="text-sm underline">Back to Years</Link>
      </div>

      {subjects.length === 0 && <p className="text-muted-foreground">No subjects found for this semester.</p>}

      <ul className="space-y-3">
        {subjects.map((sub) => (
          <li id={`subject-${sub.subject_id}`} key={sub.subject_id} className="p-3 rounded border">
            <div className="flex items-center justify-between">
              <div className="font-medium">
                {sub.name}
                <span className="ml-2 text-xs text-muted-foreground">(subject #{sub.subject_id})</span>
              </div>
              <div className="text-xs text-muted-foreground">Year #{sub.year_id}</div>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {(sub.professors ?? []).map((p) => (
                <span
                  key={p.professor_subject_id ?? String(p.professor_id)}
                  className="px-2 py-1 rounded-full border text-sm"
                  title={p.professor_subject_id ? `assignment #${p.professor_subject_id}` : ""}
                >
                  {profLabel(p)}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
