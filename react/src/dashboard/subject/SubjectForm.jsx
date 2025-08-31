import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import axiosClient from "../../axios.js";
import { Label } from "@/components/ui/label";

const SubjectForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [semesters, setSemesters] = useState([]);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    semester: "",
  });

  const fetchSubject = async () => {
    if (!id) return;
    try {
      const res = await axiosClient.get(`/subjects/${id}`);
      const Subject = res.data.data || res.data;
      setFormData({
        name: Subject.name || "",
        syllabus_file_path: Subject.syllabus_file_path || "",
      });
    } catch (error) {
      console.error("Failed to fetch Subject:", error);
    }
  };
  useEffect(() => {
    axiosClient.get("/semester")
      .then((res) => setSemesters(res.data.data))
      .catch((err) => console.error(err));
  }, []);


  useEffect(() => {
    fetchSubject();
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
        await axiosClient.put(`/subjects/${id}`, formData);
      } else {
        await axiosClient.post("/subjects", formData);
      }
      navigate("/subjects");
    } catch (error) {
      console.error("Failed to save Subject:", error);
      if (error.response?.data?.errors) {
        console.log(error.response.data.errors);
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">{id ? "Edit Subject" : "Add Subject"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Subject name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            placeholder="Subject name"
            required
          />
        </div>
        <div>
          <Label htmlFor="semester_id">Semester</Label>
          <select
            id="semester_id"
            name="semester_id"
            value={formData.semester_id}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          >
            <option value="">Select Semester</option>
            {semesters.map((s) => (
              <option key={s.semester_id} value={s.semester_id}>
                {s.semester}
              </option>
            ))}
          </select>
          {errors.semester_id && <p className="text-red-600 text-sm">{errors.semester_id[0]}</p>}
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
