import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import axiosClient from "../../axios.js";

const SubjectForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ name: "" });
  const [file, setFile] = useState(null);
  const [existingPath, setExistingPath] = useState("");

  const fetchSubject = async () => {
    if (!id) return;
    try {
      const res = await axiosClient.get(`/subjects/${id}`);
      const s = res.data.data || res.data;
      setFormData({ name: s?.name || "" });
      setExistingPath(s?.syllabus_file_path || "");
      setFile(null);
    } catch (error) {
      console.error("Failed to fetch Subject:", error);
    }
  };

  useEffect(() => {
    fetchSubject();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFile = (e) => {
    setFile(e.target.files?.[0] || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = new FormData();
      payload.append("name", formData.name.trim());

      if (id) {
        if (file) payload.append("syllabus_file_path", file); // <-- NEW KEY
        payload.append("_method", "PUT");                      // spoof PUT
        await axiosClient.post(`/subjects/${id}`, payload);
      } else {
        if (!file) {
          alert("Please choose a syllabus file (.pdf/.doc/.docx).");
          return;
        }
        payload.append("syllabus_file_path", file);            // <-- NEW KEY
        await axiosClient.post("/subjects", payload);
      }

      navigate("/subjects");
    } catch (error) {
      console.error("Failed to save Subject:", error);
      if (error.response?.data) {
        alert(
          error.response.status === 422
            ? JSON.stringify(error.response.data, null, 2)
            : "Save failed"
        );
      }
    }
  };

  const apiBase = (axiosClient.defaults.baseURL || "").replace(/\/$/, "");
  const currentFileUrl = existingPath
    ? (/^https?:\/\//i.test(existingPath)
        ? existingPath
        : `${apiBase}/${existingPath.startsWith("storage/")
            ? existingPath
            : `storage/${existingPath.replace(/^\/+/, "")}`}`)
    : null;

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">{id ? "Edit Subject" : "Add Subject"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            placeholder="e.g., Linear Algebra"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Syllabus (PDF/DOC/DOCX)</label>
          {id && currentFileUrl && (
            <div className="mb-2 text-sm">
              Current:{" "}
              <a className="underline" href={currentFileUrl} target="_blank" rel="noreferrer" download>
                View
              </a>
            </div>
          )}
          <input
            type="file"
            name="syllabus_file_path"          // <-- NEW KEY (for consistency)
            accept=".pdf,.doc,.docx"
            onChange={handleFile}
            className="w-full border rounded-md p-2"
          />
          <p className="text-xs text-muted-foreground mt-1">
            {id ? "Leave empty to keep the existing file." : "Max 4 MB."}
          </p>
        </div>

        <div className="flex gap-2">
          <Button type="submit">{id ? "Update" : "Save"}</Button>
          <Button type="button" variant="secondary" onClick={() => navigate("/subjects")}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SubjectForm;
