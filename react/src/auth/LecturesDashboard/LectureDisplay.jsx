import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosClient from "../../axios.js";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const LectureDisplay = () => {
  const { professorsubjectId } = useParams(); 
  const [Lectures, setLectures] = useState([]);

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const response = await axiosClient.get(`/lectures?professor_subject_id=${professorsubjectId}`);
        setLectures(response.data.data || []);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching Lectures:", error);
      }
    };

    if (professorsubjectId) fetchLectures();
  }, [professorsubjectId]);

  if (!Lectures.length) {
    return <div className="p-6">No Lectures found for this subject.</div>;
  }

  const buildFileHref = (path) => {
  if (!path) return null;

  // Already absolute or root-relative
  if (/^https?:\/\//i.test(path) || path.startsWith("/")) return path;

  // Windows file system path
  if (/^[a-zA-Z]:\\/.test(path)) return "file:///" + path.replace(/\\/g, "/");

  // Default: treat as public folder file
  return "/" + path.replace(/^\/+/, ""); 
};

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Lectures for Subject {professorsubjectId}</h1>
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
    </div>
  );
};

export default LectureDisplay;
