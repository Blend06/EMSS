import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import axiosClient from "../../axios.js";

const ProfessorSubjectForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    professor_id: "",
    subject_id: "",
  });

  const [professors, setProfessors] = useState([]);
  const [subjects, setSubjects] = useState([]);

  // Fetch single professor_subject if editing
  const fetchProfessorSubject = async () => {
    if (!id) return;
    try {
      const res = await axiosClient.get(`/professors_subjects/${id}`);
      const ProfessorSubject = res.data.data || res.data;
      setFormData({
        professor_id: ProfessorSubject.professor_id || "",
        subject_id: ProfessorSubject.subject_id || "",
      });
    } catch (error) {
      console.error("Failed to fetch ProfessorSubject:", error);
    }
  };

  // Fetch all professors
  const fetchProfessors = async () => {
    try {
      const res = await axiosClient.get("/professors");
      setProfessors(res.data.data || res.data);
    } catch (error) {
      console.error("Failed to fetch Professors:", error);
    }
  };

  // Fetch all subjects
  const fetchSubjects = async () => {
    try {
      const res = await axiosClient.get("/subjects");
      setSubjects(res.data.data || res.data);
    } catch (error) {
      console.error("Failed to fetch Subjects:", error);
    }
  };

  useEffect(() => {
    fetchProfessorSubject();
    fetchProfessors();
    fetchSubjects();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axiosClient.put(`/professors_subjects/${id}`, formData);
        console.log("update form data:", formData);
      } else {
        await axiosClient.post("/professors_subjects", formData);
      }
      navigate("/professors_subjects");
    } catch (error) {
      console.error("Failed to save ProfessorSubject:", error);
      if (error.response?.data?.errors) {
        console.log(error.response.data.errors);
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">
        {id ? "Edit Professor-Subject Relation" : "Add Professor-Subject Relation"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Professor Dropdown */}
        <div>
          <label className="block mb-1 font-medium">Professor</label>
          <select
            name="professor_id"
            value={formData.professor_id}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            required
          >
            <option value="">-- Select Professor --</option>
            {professors.map((prof) => (
              <option key={prof.professor_id} value={prof.professor_id}>
                {prof.user.firstname} {prof.user.lastname}
              </option>
            ))}
          </select>
        </div>

        {/* Subject Dropdown */}
        <div>
          <label className="block mb-1 font-medium">Subject</label>
          <select
            name="subject_id"
            value={formData.subject_id}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            required
          >
            <option value="">-- Select Subject --</option>
            {subjects.map((subj) => (
              <option key={subj.subject_id} value={subj.subject_id}>
                {subj.name}
              </option>
            ))}
          </select>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <Button type="submit">{id ? "Update" : "Save"}</Button>
          <Button type="button" variant="secondary" onClick={() => navigate("/professor_subjects")}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfessorSubjectForm;
