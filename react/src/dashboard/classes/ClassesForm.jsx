import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import axiosClient from "../../axios.js";

const ClassesForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
  });

  const fetchClasses = async () => {
    if (!id) return;
    try {
      const res = await axiosClient.get(`/classes/${id}`);
      const Classes = res.data.data || res.data;
      setFormData({
        name: Classes.name || "",
      });
    } catch (error) {
      console.error("Failed to fetch Classes:", error);
    }
  };

  useEffect(() => {
    fetchClasses();
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
        await axiosClient.put(`/classes/${id}`, formData);
        console.log("formdata:", formData);
      } else {
        await axiosClient.post("/classes", formData);
      }
      navigate("/classes");
    } catch (error) {
      console.error("Failed to save Classes:", error);
      if (error.response?.data?.errors) {
        console.log(error.response.data.errors);
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">{id ? "Edit Classes" : "Add Classes"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Classes</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            placeholder="Class name"
            required
          />
        </div>

        <div className="flex gap-2">
          <Button type="submit">{id ? "Update" : "Save"}</Button>
          <Button type="button" variant="secondary" onClick={() => navigate("/classes")}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ClassesForm;
