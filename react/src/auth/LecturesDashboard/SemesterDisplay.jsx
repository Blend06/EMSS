import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosClient from "../../axios.js";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const SemesterDisplay = () => {
  const { yearId } = useParams(); 
  const [semesters, setSemesters] = useState([]);

  useEffect(() => {
    const fetchSemesters = async () => {
      try {
        const response = await axiosClient.get(`/semester?year_id=${yearId}`);
        setSemesters(response.data.data || []);
      } catch (error) {
        console.error("Error fetching semesters:", error);
      }
    };

    if (yearId) fetchSemesters();
  }, [yearId]);

  if (!semesters.length) {
    return <div className="p-6">No semesters found for this year.</div>;
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Semesters for Year {yearId}</h1>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {semesters.map((semester) => (
          <Link
            key={semester.semester_id}
            to={`/subject_display/${semester.semester_id}`}
          >
            <Card className="cursor-pointer hover:shadow-md transition">
              <CardHeader>
                <CardTitle>{semester.semester}</CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SemesterDisplay;
