import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axiosClient from "../../axios.js";

const GroupForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [groupData, setGroupData] = useState({
    group: "",
    semester_id: "",
  });

  const [semesters, setSemesters] = useState([]);
  const [errors, setErrors] = useState({});

  // fetch semesters for dropdown
  useEffect(() => {
    axiosClient.get("/semester")
      .then((res) => setSemesters(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  // if editing, fetch group
  useEffect(() => {
    if (id) {
      axiosClient.get(`/groups/${id}`)
        .then((res) => {
          setGroupData({
            group: res.data.data.group,
            semester_id: res.data.data.semester_id,
          });
        })
        .catch((err) => {
          console.error(err);
          alert("Failed to fetch group data.");
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGroupData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!groupData.group || !groupData.semester_id) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      if (id) {
        await axiosClient.put(`/groups/${id}`, groupData);
      } else {
        await axiosClient.post("/groups", groupData);
      }
      navigate("/groups");
    } catch (error) {
      console.error(error);
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        alert("Error saving group");
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-background border border-border rounded-lg">
      <h2 className="text-2xl font-bold mb-4">{id ? "Edit Group" : "Add Group"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="group">Group Name</Label>
          <Input
            id="group"
            name="group"
            type="text"
            value={groupData.group}
            onChange={handleChange}
            required
          />
          {errors.group && <p className="text-red-600 text-sm">{errors.group[0]}</p>}
        </div>

        <div>
          <Label htmlFor="semester_id">Semester</Label>
          <select
            id="semester_id"
            name="semester_id"
            value={groupData.semester_id}
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

        <Button type="submit">{id ? "Update Group" : "Create Group"}</Button>
      </form>
    </div>
  );
};

export default GroupForm;
