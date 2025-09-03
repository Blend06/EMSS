import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../../axios.js";
import { Button } from "@/components/ui/button";
import { useStateContext } from "../../Contexts/ContextProvider.jsx";

const LectureDisplay = () => {
  const { professorsubjectId } = useParams();
  const { user } = useStateContext();

  const [Lectures, setLectures] = useState([]);
  const [professorSubject, setProfessorSubject] = useState(null);
  const [professor, setProfessor] = useState(null);

  const [loading, setLoading] = useState(true); // 🔹 new state
  const [showForm, setShowForm] = useState(false);
  const [newLecture, setNewLecture] = useState({
    title: "",
    file_path: ""
  });


  const fetchData = async () => {
      try {
        setLoading(true); // start loading
        const [profRes, profSubRes, lecturesRes] = await Promise.all([
          axiosClient.get(`/professors/${user.id}`),
          axiosClient.get(`/professors_subjects/${professorsubjectId}`),
          axiosClient.get(`/lectures?professor_subject_id=${professorsubjectId}`)
        ]);

        setProfessor(profRes.data);
        setProfessorSubject(profSubRes.data);
        setLectures(lecturesRes.data.data || []);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false); 
      }
    };

    
  useEffect(() => {
    if (professorsubjectId) fetchData();
  }, [professorsubjectId, user.id]);

  // 🔹 Loading state UI
  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center">
        <span className="text-lg animate-pulse">Loading lectures...</span>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosClient.post("/lectures", {
        ...newLecture,
        professor_subject_id: Number(professorsubjectId)
      });
      setLectures((prev) => [...prev, res.data]);
      setNewLecture({ title: "", file_path: "" });
      setShowForm(false);
      fetchData();
    } catch (err) {
      console.error("Error adding lecture:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewLecture((prev) => ({ ...prev, [name]: value }));
  };
 

  const buildFileHref = (path) => {
    if (!path) return null;
    if (/^https?:\/\//i.test(path) || path.startsWith("/")) return path;
    if (/^[a-zA-Z]:\\/.test(path)) {
      return "file:///" + path.replace(/\\/g, "/");
    }
    return "/" + path.replace(/^\/+/, "");
  };

   const handleDelete = async (lectureId) => {
    if (!window.confirm("Are you sure you want to delete this lecture?")) return;
    try {
      await axiosClient.delete(`/lectures/${lectureId}`);
      fetchData();
    } catch (error) {
      console.error("Failed to delete lecture:", error);
    }
  };

  return (
    <>
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Lectures</h1>

          {professor?.data?.professor_id === professorSubject?.data?.professor_id && (
            <button
              onClick={() => setShowForm((prev) => !prev)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              + Add Lecture
            </button>
          )}
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="p-4 border rounded space-y-2">
            <input
              type="text"
              name="title"
              placeholder="Lecture Title"
              value={newLecture.title}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
            <input
              type="text"
              name="file_path"
              placeholder="File Path / URL"
              value={newLecture.file_path}
              onChange={handleChange}
              className="border p-2 w-full"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Save Lecture
            </button>
          </form>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {Lectures.map((lecture) => {
          const href = buildFileHref(lecture.file_path);
          return (
            <div key={lecture.lecture_id} className="border rounded-lg p-4 shadow">
              <p className="font-semibold">Title: {lecture.title}</p>
              <p>
                Professor: {lecture.professor_subject?.professor?.firstname}{" "}
                {lecture.professor_subject?.professor?.lastname}
              </p>
              <p>Subject: {lecture.professor_subject?.subject?.name}</p>
              {href ? (
                <a href={href} target="_blank" rel="noreferrer" className="underline">
                  Open
                </a>
              ) : (
                "—"
              )}
              {lecture.professor_subject?.professor?.id === professor?.data?.professor_id && (
                <Button size="sm" variant="destructive" onClick={() => handleDelete(lecture.lecture_id)}>
                    Delete
                  </Button>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default LectureDisplay;
