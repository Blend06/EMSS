import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosClient from "../../axios.js";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const SubjectDisplay = () => {
  const { semesterId } = useParams(); 
  const [professorSubjects, setProfessorSubjects] = useState([]);

  useEffect(() => {
    const fetchProfessorSubjects = async () => {
      try {
        // 1. Get subjects for the semester
        const subRes = await axiosClient.get(`/subjects?semester_id=${semesterId}`);
        const subjects = subRes.data.data || [];
        
        if (!subjects.length) return;

        // 2. Extract subject_ids
        const subjectIds = subjects.map(s => s.subject_id).join(",");

        // 3. Get professor_subjects for those subjects
        const profRes = await axiosClient.get(`/professor_subjects/by-subjects?subject_ids=${subjectIds}`);
        setProfessorSubjects(profRes.data.data || []);
      } catch (error) {
        console.error("Error fetching professor subjects:", error);
      }
    };

    if (semesterId) fetchProfessorSubjects();
  }, [semesterId]);

  if (!professorSubjects.length) {
    return <div className="p-6">No subjects found for this semester.</div>;
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Subjects for Semester {semesterId}</h1>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {professorSubjects.map((ps) => (
          <Link
            key={ps.professor_subject_id}
            to={`/lecture_display/${ps.professor_subject_id}`}
          >
            <Card className="cursor-pointer hover:shadow-md transition">
              <CardHeader>
                <CardTitle>
                  {ps.subject_name} - {ps.professor_firstname} {ps.professor_lastname}
                </CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SubjectDisplay;
