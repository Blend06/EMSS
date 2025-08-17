import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import axiosClient from "../../axios.js";

const YearForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    academic_year: "",
  });

  const fetchYear = async () => {
    if (!id) return;
    try {
      const res = await axiosClient.get(`/years/${id}`);
      const year = res.data.data || res.data;
      setFormData({
        academic_year: year.academic_year || "",
      });
    } catch (error) {
      console.error("Failed to fetch year:", error);
    }
  };

  useEffect(() => {
    fetchYear();
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
        await axiosClient.put(`/years/${id}`, formData);
      } else {
        await axiosClient.post("/years", formData);
      }
      navigate("/years");
    } catch (error) {
      console.error("Failed to save year:", error);
      if (error.response?.data?.errors) {
        console.log(error.response.data.errors);
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">{id ? "Edit Year" : "Add Year"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Academic Year</label>
          <input
            type="text"
            name="academic_year"
            value={formData.academic_year}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            placeholder="e.g., 2025/2026"
            required
          />
        </div>

        <div className="flex gap-2">
          <Button type="submit">{id ? "Update" : "Save"}</Button>
          <Button type="button" variant="secondary" onClick={() => navigate("/years")}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default YearForm;
