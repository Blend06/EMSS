import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import axiosClient from "../../axios.js";

const GenerationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    generation: "",
  });

  const fetchGeneration = async () => {
    if (!id) return;
    try {
      const res = await axiosClient.get(`/generations/${id}`);
      const Generation = res.data.data || res.data;
      setFormData({
        generation: Generation.generation || "",
      });
    } catch (error) {
      console.error("Failed to fetch Generation:", error);
    }
  };

  useEffect(() => {
    fetchGeneration();
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
        await axiosClient.put(`/generations/${id}`, formData);
      } else {
        await axiosClient.post("/generations", formData);
      }
      navigate("/generations");
    } catch (error) {
      console.error("Failed to save Generation:", error);
      if (error.response?.data?.errors) {
        console.log(error.response.data.errors);
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">{id ? "Edit Generation" : "Add Generation"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Generation</label>
          <input
            type="text"
            name="generation"
            value={formData.generation}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            placeholder="e.g., 2025/2026"
            required
          />
        </div>

        <div className="flex gap-2">
          <Button type="submit">{id ? "Update" : "Save"}</Button>
          <Button type="button" variant="secondary" onClick={() => navigate("/generations")}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default GenerationForm;
