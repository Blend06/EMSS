import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import axiosClient from "../../axios.js";

const LectureForm = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [professorSubjects, setProfessorSubjects] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    file_path: "",
    professor_subject_id: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(!!id);
  const userTouched = useRef(false); // prevents fetch from overwriting after user types

  // Helper: build a clickable link for file_path if possible
  const buildFileHref = (path) => {
    if (!path) return null;
    if (/^https?:\/\//i.test(path) || path.startsWith("/")) return path; // web URL or web path
    if (/^file:\/\//i.test(path)) return path; // already a file URL
    if (/^[a-zA-Z]:\\/.test(path)) {
      // Windows local path -> file:///
      return "file:///" + path.replace(/\\/g, "/");
    }
    // Linux/mac absolute path: /home/... is handled above; if it starts with anything else, just return as-is
    return path;
  };

  const fetchProfessorSubjects = async () => {
    try {
      const res = await axiosClient.get("/professors_subjects");
      const data = res.data?.data ?? res.data ?? [];
      setProfessorSubjects(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch professor-subjects:", error);
    }
  };

  const fetchLecture = async () => {
    if (!id) return;
    try {
      const res = await axiosClient.get(`/lectures/${id}`);
      const lec = res.data?.data ?? res.data ?? {};
      // Only set initial values if the user hasn't started typing
      if (!userTouched.current) {
        setFormData({
          title: lec.title ?? "",
          file_path: lec.file_path ?? "",
          professor_subject_id:
            lec.professor_subject_id !== undefined && lec.professor_subject_id !== null
              ? Number(lec.professor_subject_id)
              : "",
        });
      }
    } catch (error) {
      console.error("Failed to fetch lecture:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfessorSubjects();
    fetchLecture();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleChange = (e) => {
    userTouched.current = true;
    const { name, value } = e.target;
    const nextValue =
      name === "professor_subject_id" && value !== "" ? Number(value) : value;
    setFormData((prev) => ({ ...prev, [name]: nextValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      if (id) {
        await axiosClient.put(`/lectures/${id}`, formData);
      } else {
        await axiosClient.post("/lectures", formData);
      }
      navigate("/lectures");
    } catch (error) {
      console.error("Failed to save lecture:", error);
      const apiErrors = error.response?.data?.errors || {};
      setErrors(apiErrors);
    }
  };

  const currentFileHref = buildFileHref(formData.file_path);

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">{id ? "Edit Lecture" : "Add Lecture"}</h2>

      {loading ? (
        <p>Loading…</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block mb-1 font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
              placeholder="Lecture title"
              required
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {Array.isArray(errors.title) ? errors.title[0] : errors.title}
              </p>
            )}
          </div>

          {/* File path (string) */}
          <div>
            <label className="block mb-1 font-medium">File Path</label>
            <input
              type="text"
              name="file_path"
              value={formData.file_path}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
              placeholder="e.g. /storage/lectures/week1.pdf or https://example.com/file.pdf or C:\docs\file.pdf"
            />
            {formData.file_path && (
              <p className="text-sm mt-2">
                Current file:&nbsp;
                {currentFileHref ? (
                  <a
                    href={currentFileHref}
                    target="_blank"
                    rel="noreferrer"
                    className="underline"
                  >
                    open
                  </a>
                ) : (
                  <span className="opacity-70">not web-accessible</span>
                )}
              </p>
            )}
            {errors.file_path && (
              <p className="text-red-500 text-sm mt-1">
                {Array.isArray(errors.file_path) ? errors.file_path[0] : errors.file_path}
              </p>
            )}
            {/* Helpful hint for local paths */}
            {formData.file_path &&
              /^[a-zA-Z]:\\/.test(formData.file_path) && (
                <p className="text-xs mt-1 opacity-70">
                  Tip: Browser links to local <code>file:///</code> paths may be blocked for
                  security. Prefer a web path (e.g. <code>/storage/...</code>) or an HTTPS URL.
                </p>
              )}
          </div>

          {/* Professor–Subject */}
          <div>
            <label className="block mb-1 font-medium">Professor–Subject</label>
            <select
              name="professor_subject_id"
              value={formData.professor_subject_id}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
              required
            >
              <option value="">-- Select --</option>
              {professorSubjects.map((ps) => (
                <option key={ps.professor_subject_id} value={ps.professor_subject_id}>
                  {[
                    [ps.professor_firstname, ps.professor_lastname].filter(Boolean).join(" "),
                    ps.subject_name,
                  ]
                    .filter(Boolean)
                    .join(" – ") || `ID ${ps.professor_subject_id}`}
                </option>
              ))}
            </select>
            {errors.professor_subject_id && (
              <p className="text-red-500 text-sm mt-1">
                {Array.isArray(errors.professor_subject_id)
                  ? errors.professor_subject_id[0]
                  : errors.professor_subject_id}
              </p>
            )}
          </div>

          {/* Submit & Cancel */}
          <div className="flex gap-2">
            <Button type="submit">{id ? "Update" : "Save"}</Button>
            <Button type="button" variant="secondary" onClick={() => navigate("/lectures")}>
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default LectureForm;
