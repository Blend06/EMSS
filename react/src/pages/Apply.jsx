import { useState } from "react";
import { useNavigate} from "react-router-dom";
import { Button } from "@/components/ui/button";
import axiosClient from "../axios.js";
import { useStateContext } from "../Contexts/ContextProvider.jsx";

const Apply = () => {
    const { user } = useStateContext();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        id_card_number: "",
        caretaker_name: "",
        caretaker_phone: "",
        "group_id": null,
        "generation_id": null,
    });
    
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
         user_id: user.id,
      };
      console.log("Submitting payload:", payload);
      await axiosClient.post("/students", payload);
      navigate("/");
    } catch (error) {
      console.error("Failed to save student:", error);
      if (error.response?.data?.errors) {
        console.log(error.response.data.errors); 
      }
    }
  };

    return (
    <div className="max-w-lg mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">Your Information</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">ID card number</label>
          <input
            type="text"
            name="id_card_number"
            value={formData.id_card_number}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            placeholder="e.g., 1234567890123"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Caretaker Name</label>
          <input
            type="text"
            name="caretaker_name"
            value={formData.caretaker_name}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            placeholder="e.g., John Doe"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Caretaker Phone</label>
          <input
            type="text"
            name="caretaker_phone"
            value={formData.caretaker_phone}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            placeholder="e.g., +1234567890  "
            required
          />
        </div>

        <div className="flex gap-2">
          <Button type="submit">Save</Button>
          <Button type="button" variant="secondary" onClick={() => navigate("/")}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );


}
     export default Apply;