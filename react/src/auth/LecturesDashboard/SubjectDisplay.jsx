import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosClient from "../../axios.js";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const SubjectDisplay = () => {
  const { semesterId } = useParams(); 
  const [Subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axiosClient.get(`/subjects?semester_id=${semesterId}`);
        setSubjects(response.data.data || []);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching Subjects:", error);
      }
    };

    if (semesterId) fetchSubjects();
  }, [semesterId]);

  if (!Subjects.length) {
    return <div className="p-6">No Subjects found for this semester.</div>;
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Subjects for Semester {semesterId}</h1>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {Subjects.map((sub) => (
          <Link
            key={sub.subject_id}
            to={`/lecture_display/${sub.subject_id}`}
          >
            <Card className="cursor-pointer hover:shadow-md transition">
              <CardHeader>
                <CardTitle>{sub.name}</CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SubjectDisplay;
