import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosClient from "../../axios.js";
import { useStateContext } from "../../Contexts/ContextProvider.jsx";

const LectureDisplay = () => {
  const { professorsubjectId } = useParams();
  const [Lectures, setLectures] = useState([]); // use Lectures everywhere
  const { user } = useStateContext();
  const [professorSubject, setProfessorSubject] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newLecture, setNewLecture] = useState({
    title: "",
    file_path: ""
  });

  // Fetch the professor_subject info
  useEffect(() => {
    const fetchProfessorSubject = async () => {
      try {
        const res = await axiosClient.get(`/professor_subjects/${professorsubjectId}`);
        setProfessorSubject(res.data);
        console.log("professorSubject:", res.data);

      } catch (err) {
        console.error("Error fetching professor-subject:", err);
      }
    };
    if (professorsubjectId) fetchProfessorSubject();
  }, [professorsubjectId]);

  // Fetch lectures for that professor_subject
  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const response = await axiosClient.get(
          `/lectures?professor_subject_id=${professorsubjectId}`
        );
        setLectures(response.data.data || []);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching lectures:", error);
      }
    };
    if (professorsubjectId) fetchLectures();
  }, [professorsubjectId]);

  // Handle empty state early
  if (!Lectures.length) {
    return <div className="p-6">No Lectures found for this subject.</div>;
  }

  // Build file href safely
  const buildFileHref = (path) => {
    if (!path) return null;

    // Already absolute or root-relative
    if (/^https?:\/\//i.test(path) || path.startsWith("/")) return path;

    // Windows file system path
    if (/^[a-zA-Z]:\\/.test(path)) {
      return "file:///" + path.replace(/\\/g, "/");
    }

    // Default: treat as public folder file
    return "/" + path.replace(/^\/+/, "");
  };

  return (
    <>
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Lectures for Subject {professorsubjectId}</h1>

            {professorSubject && user && professorSubject.professor_id === user.id && (
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
            <div key={lecture.id} className="border rounded-lg p-4 shadow">
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
            </div>
          );
        })}
      </div>
    </>
  );
};

export default LectureDisplay;
