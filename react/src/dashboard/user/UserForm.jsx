import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axiosClient from "../../axios.js";

const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    birthdate: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
    isAdmin: false,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      axiosClient
        .get(`/users/${id}`)
        .then((res) => {
          setUserData({
            ...res.data,
            password: "",
            password_confirmation: "",
          });
        })
        .catch((err) => {
          console.error(err);
          alert("Failed to fetch user data.");
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setErrors({});

  // Basic frontend validation
  if (!userData.firstname || !userData.lastname || !userData.birthdate || !userData.email || !userData.phone) {
    alert("Please fill all required fields.");
    return;
  }

  if (!id && !userData.password) {
    alert("Password is required for new users.");
    return;
  }

  if (userData.password && userData.password !== userData.password_confirmation) {
    alert("Passwords do not match.");
    return;
  }

  try {
    // Prepare payload for API
    const payload = { ...userData };

    // Remove password if empty
    if (!payload.password) delete payload.password;

    // Remove password_confirmation (not in DB)
    delete payload.password_confirmation;

    if (id) {
      // Update user
      await axiosClient.put(`/users/${id}`, payload);
    } else {
      // Create new user
      await axiosClient.post("/users", payload);
    }

    navigate("/users");
  } catch (error) {
    console.error(error);
    if (error.response?.data?.errors) {
      setErrors(error.response.data.errors);
    } else {
      alert("Error saving user");
    }
  }
};

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-background border border-border rounded-lg">
      <h2 className="text-2xl font-bold mb-4">{id ? "Edit User" : "Add User"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["firstname", "lastname", "birthdate", "email", "phone"].map((field) => (
          <div key={field}>
            <Label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
            <Input
              id={field}
              name={field}
              type={field === "birthdate" ? "date" : field === "email" ? "email" : "text"}
              value={userData[field]}
              onChange={handleChange}
              required
            />
            {errors[field] && <p className="text-red-600 text-sm">{errors[field][0]}</p>}
          </div>
        ))}

        <div> 
          <Label htmlFor="password">Password {id ? "(Leave blank to keep current)" : ""}</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={userData.password}
            onChange={handleChange}
            placeholder={id ? "Leave blank to keep current password" : ""}
            required={!id}
          />
          {errors.password && <p className="text-red-600 text-sm">{errors.password[0]}</p>}
        </div>

        <div>
          <Label htmlFor="password_confirmation">Confirm Password</Label>
          <Input
            id="password_confirmation"
            name="password_confirmation"
            type="password"
            value={userData.password_confirmation}
            onChange={handleChange}
            placeholder={id ? "Leave blank to keep current password" : ""}
            required={!!userData.password}
          />
        </div>

        <div className="flex items-center gap-2">
          <Input
            id="isAdmin"
            name="isAdmin"
            type="checkbox"
            checked={userData.isAdmin}
            onChange={handleChange}
          />
          <Label htmlFor="isAdmin">Is Admin</Label>
        </div>

        <Button type="submit">{id ? "Update User" : "Create User"}</Button>
      </form>
    </div>
  );
};

export default UserForm;
