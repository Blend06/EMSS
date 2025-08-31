import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import axiosClient from "../../../axios.js";

const StudentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [formData, setFormData] = useState({
    user_id: "",
    id_card_number: "",
    conduct_grade: "",
    group_id: "",
    caretaker_name: "",
    caretaker_phone: "",
    status:"",
  });

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await axiosClient.get("/users");
      setUsers(res.data.data || res.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  // Fetch all groups
  const fetchGroups = async () => {
    try {
      const res = await axiosClient.get("/groups");
      setGroups(res.data.data || res.data);
    } catch (error) {
      console.error("Failed to fetch groups:", error);
    }
  };

  // Fetch student data if editing
  const fetchStudent = async () => {
    if (!id) return;
    try {
      const res = await axiosClient.get(`/students/${id}`);
      const student = res.data.data || res.data;
      setFormData({
        user_id: student.user_id || "",
        id_card_number: student.id_card_number || "",
        conduct_grade: student.conduct_grade || "",
        group_id: student.group_id || "",
        caretaker_name: student.caretaker_name || "",
        caretaker_phone: student.caretaker_phone || "",
        status: student.status || "",
      });
    } catch (error) {
      console.error("Failed to fetch student:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchGroups();
    fetchStudent();
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
      const payload = {
        ...formData,
        conduct_grade: formData.conduct_grade || 'E', // optional
      };
      console.log("Submitting payload:", payload);

      if (id) {
        await axiosClient.put(`/students/${id}`, payload);
      } else {
        await axiosClient.post("/students", payload);
      }

      navigate("/students");
    } catch (error) {
      console.error("Failed to save student:", error);
      if (error.response?.data?.errors) {
        console.log(error.response.data.errors); // log backend validation errors
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">{id ? "Edit Student" : "Add Student"}</h2>
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

        {/* ID Card Number */}
        <div>
          <label className="block mb-1 font-medium">ID Card Number</label>
          <input
            type="text"
            name="id_card_number"
            value={formData.id_card_number}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            required
          />
        </div>

        {/* Group dropdown */}
        <div>
          <label className="block mb-1 font-medium">Group</label>
          <select
            name="group_id"
            value={formData.group_id}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            
          >
            <option value="">-- Select Group --</option>
            {groups.map((g) => (
              <option key={g.group_id} value={g.group_id}>
                {g.group}
              </option>
            ))}
          </select>
        </div>


        {/* Caretaker Name */}
        <div>
          <label className="block mb-1 font-medium">Caretaker Name</label>
          <input
            type="text"
            name="caretaker_name"
            value={formData.caretaker_name}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            required
          />
        </div>

        {/* Caretaker Phone */}
        <div>
          <label className="block mb-1 font-medium">Caretaker Phone</label>
          <input
            type="text"
            name="caretaker_phone"
            value={formData.caretaker_phone}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            required
          />
        </div>

        {/* conduct grade drop dwon */}
        <div>
          <label className="block mb-1 font-medium">Conduct Grade</label>
          <select
            name="conduct_grade"
            value={formData.conduct_grade}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            required
          >
            <option value="">-- Select a Conduct Grade --</option>
            <option value="E">E</option>
            <option value="S">S</option>
            <option value="N">N</option>
            <option value="U">U</option>
            
          </select>
        </div>
        

        {/* status */}
        <div>
          <label className="block mb-1 font-medium">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            required
          >
            <option value="">-- Select Status --</option>
            <option value="pending">pending</option>
            <option value="accepted">accepted</option>
            <option value="rejected">rejected</option>
            
          </select>
        </div>

        {/* Submit buttons */}
        <div className="flex gap-2">
          <Button type="submit">{id ? "Update" : "Save"}</Button>
          <Button type="button" variant="secondary" onClick={() => navigate("/students")}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;
