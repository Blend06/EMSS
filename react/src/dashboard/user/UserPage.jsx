import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../axios.js";

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const res = await axiosClient.get("/users");
      setUsers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axiosClient.delete(`/users/${id}`);
        fetchUsers();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Users</h2>
        <Button onClick={() => navigate("/users/new")}>Add User</Button>
      </div>

      <table className="w-full border border-border rounded-lg">
        <thead>
          <tr className="bg-muted-foreground/10">
            <th className="p-2 border-b">First Name</th>
            <th className="p-2 border-b">Last Name</th>
            <th className="p-2 border-b">Email</th>
            <th className="p-2 border-b">Phone</th>
            <th className="p-2 border-b">Birthdate</th>
            <th className="p-2 border-b">Admin</th>
            <th className="p-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-accent/10">
              <td className="p-2 border-b">{user.firstname}</td>
              <td className="p-2 border-b">{user.lastname}</td>
              <td className="p-2 border-b">{user.email}</td>
              <td className="p-2 border-b">{user.phone}</td>
              <td className="p-2 border-b">{user.birthdate}</td>
              <td className="p-2 border-b">{user.isAdmin ? "Yes" : "No"}</td>
              <td className="p-2 border-b flex gap-2">
                <Button size="sm" onClick={() => navigate(`/users/edit/${user.id}`)}>
                  Edit
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(user.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserPage;
