import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import axiosClient from "../../axios";

const ScheduleForm = () => {
  const { id } = useParams(); // ID for edit
  const navigate = useNavigate();

  const [groups, setGroups] = useState([]);
  const [classes, setClasses] = useState([]);
  const [professorSubjects, setProfessorSubjects] = useState([]);

  const [formData, setFormData] = useState({
    group_id: "",
    class_id: "",
    professor_subject_id: "",
    time: "",
    day: "",
  });

  const [errors, setErrors] = useState({});

  // Fetch data
  const fetchGroups = async () => {
    try {
      const res = await axiosClient.get("/groups");
      setGroups(res.data.data || res.data);
    } catch (error) {
      console.error("Failed to fetch groups:", error);
    }
  };

  const fetchClasses = async () => {
    try {
      const res = await axiosClient.get("/classes");
      setClasses(res.data.data || res.data);
    } catch (error) {
      console.error("Failed to fetch classes:", error);
    }
  };

  const fetchProfessorSubjects = async () => {
    try {
      const res = await axiosClient.get("/professors_subjects");
      setProfessorSubjects(res.data.data || res.data);
    } catch (error) {
      console.error("Failed to fetch professor subjects:", error);
    }
  };

  // Fetch schedule if editing
  const fetchSchedule = async () => {
    if (!id) return;
    try {
      const res = await axiosClient.get(`/schedules/${id}`);
      const scheduleData = res.data.data || res.data;
      setFormData({
        group_id: scheduleData.group_id || "",
        class_id: scheduleData.class_id || "",
        professor_subject_id: scheduleData.professor_subject_id || "",
        time: scheduleData.time || "",
        day: scheduleData.day || "",
      });
    } catch (error) {
      console.error("Failed to fetch schedule:", error);
    }
  };

  useEffect(() => {
    fetchGroups();
    fetchClasses();
    fetchProfessorSubjects();
    fetchSchedule();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const payload = { ...formData };

    try {
      if (id) {
        await axiosClient.put(`/schedules/${id}`, payload);
      } else {
        await axiosClient.post("/schedules", payload);
      }
      navigate("/schedules");
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors || {});
      } else {
        console.error("Failed to submit schedule:", error);
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">
        {id ? "Edit Schedule" : "Add Schedule"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Time */}
        <div>
          <label className="block mb-1 font-medium">Time</label>
          <input
            type="text"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            required
          />
          {errors.time && (
            <p className="text-red-500 text-sm mt-1">{errors.time[0]}</p>
          )}
        </div>

        {/* Day */}
        <div>
          <label className="block mb-1 font-medium">Day</label>
          <select
            name="day"
            value={formData.day}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            required
          >
            <option value="">-- Select a Day --</option>
            <option value="monday">Monday</option>
            <option value="tuesday">Tuesday</option>
            <option value="wednesday">Wednesday</option>
            <option value="thursday">Thursday</option>
            <option value="friday">Friday</option>
            <option value="saturday">Saturday</option>
          </select>
          {errors.day && (
            <p className="text-red-500 text-sm mt-1">{errors.day[0]}</p>
          )}
        </div>

        {/* Group */}
        <div>
          <label className="block mb-1 font-medium">Group</label>
          <select
            name="group_id"
            value={formData.group_id}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            required
          >
            <option value="">-- Select a Group --</option>
            {groups.map((group) => (
              <option key={group.group_id} value={group.group_id}>
                {group.group}
              </option>
            ))}
          </select>
          {errors.group_id && (
            <p className="text-red-500 text-sm mt-1">{errors.group_id[0]}</p>
          )}
        </div>

        {/* Class */}
        <div>
          <label className="block mb-1 font-medium">Class</label>
          <select
            name="class_id"
            value={formData.class_id}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            required
          >
            <option value="">-- Select a Class --</option>
            {classes.map((cls) => (
              <option key={cls.class_id} value={cls.class_id}>
                {cls.name}
              </option>
            ))}
          </select>
          {errors.class_id && (
            <p className="text-red-500 text-sm mt-1">{errors.class_id[0]}</p>
          )}
        </div>

        {/* Professor Subject */}
        <div>
          <label className="block mb-1 font-medium">Professor Subject</label>
          <select
            name="professor_subject_id"
            value={formData.professor_subject_id}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            required
          >
            <option value="">-- Select a Professor Subject --</option>
            {professorSubjects.map((ps) => (
              <option key={ps.professor_subject_id} value={ps.professor_subject_id}>
                {ps.professor_firstname} {ps.professor_lastname} - {ps.subject_name}
              </option>
            ))}
          </select>
          {errors.professor_subject_id && (
            <p className="text-red-500 text-sm mt-1">
              {errors.professor_subject_id[0]}
            </p>
          )}
        </div>

        {/* Submit & Cancel */}
        <div className="flex gap-2">
          <Button type="submit">{id ? "Update" : "Save"}</Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate("/schedules")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ScheduleForm;
