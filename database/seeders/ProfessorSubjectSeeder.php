<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Professor_Subject;

class ProfessorSubjectSeeder extends Seeder
{
    public function run(): void
    {
        $professorSubjects = [
            ['professor_id' => 1, 'subject_id' => 1], // John Smith - Mathematics
            ['professor_id' => 1, 'subject_id' => 3], // John Smith - Physics
            ['professor_id' => 2, 'subject_id' => 2], // Sarah Johnson - Computer Science
            ['professor_id' => 3, 'subject_id' => 3], // Michael Brown - Physics
            ['professor_id' => 3, 'subject_id' => 4], // Michael Brown - Chemistry
            ['professor_id' => 4, 'subject_id' => 5], // Emily Davis - Biology
            ['professor_id' => 5, 'subject_id' => 6], // David Wilson - English Literature
            ['professor_id' => 6, 'subject_id' => 7], // Lisa Anderson - History
            ['professor_id' => 7, 'subject_id' => 8], // James Taylor - Economics
            ['professor_id' => 8, 'subject_id' => 9], // Anna Martinez - Psychology
            ['professor_id' => 9, 'subject_id' => 10], // Robert Garcia - Philosophy
            ['professor_id' => 2, 'subject_id' => 1], // Sarah Johnson - Mathematics
        ];

        foreach ($professorSubjects as $professorSubjectData) {
            Professor_Subject::create($professorSubjectData);
        }
    }
}