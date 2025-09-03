import { useState } from "react";
import axiosClient from "../../axios"; // adjust path if different

const AddLecture = ({ professorSubjectId, onLectureAdded }) => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("title", title);
      if (file) {
        formData.append("file", file); // backend should handle file uploads
      }

      const res = await axiosClient.post(
        `/professor-subjects/${professorSubjectId}/lectures`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setTitle("");
      setFile(null);

      if (onLectureAdded) {
        onLectureAdded(res.data);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to add lecture. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-4">Add New Lecture</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Lecture title */}
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border rounded-lg px-3 py-2"
            placeholder="Enter lecture title"
            required
          />
        </div>

        {/* Lecture file */}
        <div>
          <label className="block text-sm font-medium">Upload File</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="mt-1 block w-full"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Add Lecture"}
        </button>
      </form>

      {error && <p className="text-red-600 mt-3">{error}</p>}
    </div>
  );
};

export default AddLecture;
