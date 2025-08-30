import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../axios.js";

const profLabel = (p) => {
  const u = p?.user || {};
  const full = [u.firstname, u.lastname].filter(Boolean).join(" ");
  return u.name ?? (full || `Professor #${p.professor_id}`);
};

export default function SubjectLectures() {
  const [years, setYears] = useState([]);
  const [yearId, setYearId] = useState("");
  const [semesters, setSemesters] = useState([]);
  const [loadingYears, setLoadingYears] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const fetchYears = async () => {
    setLoadingYears(true);
    try {
      const res = await axiosClient.get("/years");
      setYears(res.data?.data || []);
    } finally {
      setLoadingYears(false);
    }
  };

  const fetchSemesters = async (id) => {
    if (!id) return;
    setLoadingData(true);
    try {
      const res = await axiosClient.get("/semester", {
        params: { year_id: id, with_subjects: 1 },
      });
      setSemesters(res.data?.data || []);
    } catch (e) {
      setErrors({ general: "Failed to load semesters." });
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => { fetchYears(); }, []);
  useEffect(() => { if (yearId) fetchSemesters(yearId); }, [yearId]);

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-background border border-border rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Subjects by Year → Semester</h2>

      <div className="grid gap-4 sm:grid-cols-3 items-end mb-6">
        <div className="sm:col-span-3">
          <Label htmlFor="year_id">Select Year</Label>
          <select
            id="year_id"
            name="year_id"
            value={yearId}
            onChange={(e) => setYearId(e.target.value)}
            className="w-full border rounded p-2"
            required
          >
            <option value="">Choose Year</option>
            {years.map((y) => (
              <option key={y.year_id} value={y.year_id}>
                {y.academic_year ?? `Year #${y.year_id}`}
              </option>
            ))}
          </select>
        </div>
      </div>

      {!yearId && <p className="text-muted-foreground">Pick a year to see semesters and subjects.</p>}
      {loadingYears && <p>Loading years…</p>}
      {yearId && !loadingData && semesters.length === 0 && (
        <p className="text-muted-foreground">No semesters found for this year.</p>
      )}

      <div className="space-y-6">
        {semesters.map((sem) => (
          <div key={sem.semester_id} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <button
                type="button"
                onClick={() => navigate(`/student_dashboard/subjects/${sem.semester_id}`)}
                className="text-left text-xl font-semibold hover:underline"
                title="View subjects in this semester"
              >
                {sem.semester} <span className="text-sm text-muted-foreground">#{sem.semester_id}</span>
              </button>
              <span className="text-sm text-muted-foreground">Year ID: {sem.year_id}</span>
            </div>

            <ul className="space-y-3">
              {(sem.subjects ?? []).map((sub) => (
                <li key={sub.subject_id} className="p-3 rounded border">
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      className="font-medium text-left hover:underline"
                      onClick={() => navigate(`/student_dashboard/subjects/${sem.semester_id}#subject-${sub.subject_id}`)}
                      title="Scroll to this subject on the semester page"
                    >
                      {sub.name}
                      <span className="ml-2 text-xs text-muted-foreground">(subject #{sub.subject_id})</span>
                    </button>
                    <div className="text-xs text-muted-foreground">Semester #{sub.semester_id}</div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {(sub.professors ?? []).map((p) => (
                      <span
                        key={p.professor_subject_id ?? String(p.professor_id)}
                        className="px-2 py-1 rounded-full border text-sm"
                        data-psid={p.professor_subject_id ?? ""}
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
        ))}
      </div>

      {errors.general && <p className="text-red-600 text-sm mt-4">{errors.general}</p>}
    </div>
  );
}
