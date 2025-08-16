import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import axiosClient from "../../../axios.js";

const ProfessorForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    user_id: "",
  });

  const fetchUsers = async () => {
    try {
      const res = await axiosClient.get("/users"); 
      setUsers(res.data.data || res.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const fetchProfessor = async () => {
    if (!id) return;
    try {
      const res = await axiosClient.get(`/professors/${id}`);
      setFormData({
        user_id: res.data.data?.user_id || res.data.user_id,
      });
    } catch (error) {
      console.error("Failed to fetch professor:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchProfessor();
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
        await axiosClient.put(`/professors/${id}`, formData);
      } else {
        await axiosClient.post("/professors", formData);
      }
      navigate("/professors");
    } catch (error) {
      console.error("Failed to save professor:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">
        {id ? "Edit Professor" : "Add Professor"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* User dropdown */}
        <div>
          <label className="block mb-1 font-medium">Select User</label>
          <select
            name="user_id"
            value={formData.user_id}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            required
          >
            <option value="">-- Select a User --</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.firstname} ({user.email})
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">
          <Button type="submit">{id ? "Update" : "Save"}</Button>
          <Button type="button" variant="secondary" onClick={() => navigate("/professors")}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfessorForm;
