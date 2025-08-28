import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axiosClient from "../../axios.js";
import { useStateContext } from "../../Contexts/ContextProvider.jsx";

const StudentGroup = () => {
  const [groups, setGroups] = useState([]);
  const [groupData, setGroupData] = useState({ group_id: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { user } = useStateContext(); 

  const fetchGroups = async () => {
    try {
      const res = await axiosClient.get("/groups");
      setGroups(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleChange = (e) => {
    setGroupData({ ...groupData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      await axiosClient.put(`/students/${user.id}/group`, {
        group_id: groupData.group_id,
      });

      alert("Group updated successfully ✅");
      navigate("/student_dashboard/profile");
    } catch (err) {
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors);
      } else {
        console.error(err);
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-background border border-border rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Select Your Group</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="group_id">Select Group</Label>
          <select
            id="group_id"
            name="group_id"
            value={groupData.group_id}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          >
            <option value="">Select Group</option>
            {groups.map((g) => (
              <option key={g.group_id} value={g.group_id}>
                {g.group} - {g.semester} - {g.year}
              </option>
            ))}
          </select>
          {errors.group_id && (
            <p className="text-red-600 text-sm">{errors.group_id[0]}</p>
          )}
        </div>

        <Button type="submit" className="w-full">
          Save Group
        </Button>
      </form>
    </div>
  );
};

export default StudentGroup;
