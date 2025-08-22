import {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import axiosClient from "../../axios";

const GradeForm = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        student_id: "",
        professor_subject_id: "",
        grade: "",
    });

    const [professorSubjects, setProfessorSubjects] = useState([]);
    const [students, setStudents] = useState([]);

    const fetchProfessorSubjects = async () => {
        try {
            const res = await axiosClient.get("/professors_subjects");
            const data = res.data?.data ?? res.data ?? [];
            setProfessorSubjects(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Failed to fetch professor-subjects')
        }
    }

    const fetchStudents = async () => {
        try {
            const res = await axiosClient.get("/students");
            const data = res.data?.data ?? res.data ?? [];
            setStudents(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Failed to fetch students')
        }
    }

    const fetchGrades = async () => {
        if(!id) return;

        try {
            const res = await axiosClient.get(`/grades/${id}`);
            const data = res.data?.data ?? {};


        } catch(error) {

        }
    }
 

   


}

export default GradeForm;