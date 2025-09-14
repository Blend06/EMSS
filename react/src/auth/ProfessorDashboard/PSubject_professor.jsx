import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosClient from "../../axios.js";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";



const PSubject_professor = () => {

    const { professorId } = useParams();
    const [professorSubjects, setProfessorSubjects] = useState([]);

    useEffect(() => {
        const fetchProfessorSubjects = async () => {
            try {
                const response = await axiosClient.get(`/professors_subjects?professor_id=${professorId}`)
                setProfessorSubjects(response.data|| []);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching professor subjects:", error);
            }
        };
        fetchProfessorSubjects();
    }, [professorId]);

    return (
    <div className="p-6 space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {professorSubjects.map((ps) => (
          <Link
            key={ps.professor_subject_id}
            to={`/professor_dashboard/grade_student/${ps.professor_subject_id}`}
          >
            <Card className="cursor-pointer hover:shadow-md transition">
              <CardHeader>
                <CardTitle>{ps.subject?.name}</CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
  
} 
export default PSubject_professor;