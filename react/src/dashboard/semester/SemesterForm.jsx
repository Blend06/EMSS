import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import axiosClient from "../../axios.js";

const SemesterForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [years, setYears] = useState([]);
  const [formData, setFormData] = useState({
    semester: "",
    year_id: "",
  });

  // Fetch all years for dropdown
  const fetchYears = async () => {
    try {
      const res = await axiosClient.get("/years");
      setYears(res.data.data || res.data);
    } catch (error) {
      console.error("Failed to fetch years:", error);
    }
  };

  // Fetch semester if editing
  const fetchSemester = async () => {
    if (!id) return;
    try {
      const res = await axiosClient.get(`/semesters/${id}`);
      setFormData({
        semester: res.data.data?.semester || res.data.semester,
        year_id: res.data.data?.year_id || res.data.year_id,
      });
    } catch (error) {
      console.error("Failed to fetch semester:", error);
    }
  };

  useEffect(() => {
    fetchYears();
    fetchSemester();
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
        await axiosClient.put(`/semesters/${id}`, formData);
      } else {
        await axiosClient.post("/semesters", formData);
      }
      navigate("/semesters");
    } catch (error) {
      console.error("Failed to save semester:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">
        {id ? "Edit Semester" : "Add Semester"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Semester name */}
        <div>
          <label className="block mb-1 font-medium">Semester Name</label>
          <input
            type="text"
            name="semester"
            value={formData.semester}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            required
          />
        </div>

        {/* Year dropdown */}
        <div>
          <label className="block mb-1 font-medium">Select Year</label>
          <select
            name="year_id"
            value={formData.year_id}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            required
          >
            <option value="">-- Select a Year --</option>
            {years.map((year) => (
              <option key={year.year_id} value={year.year_id}>
                {year.year_name || `Year ${year.year_id}`}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">
          <Button type="submit">{id ? "Update" : "Save"}</Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate("/semesters")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SemesterForm;
