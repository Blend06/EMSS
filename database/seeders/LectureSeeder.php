<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Lecture;

class LectureSeeder extends Seeder
{
    public function run(): void
    {
        $lectures = [
            [
                'title' => 'Introduction to Calculus',
                'file_path' => '/lectures/calculus_intro.pdf',
                'professor_subject_id' => 1
            ],
            [
                'title' => 'Linear Algebra Basics',
                'file_path' => '/lectures/linear_algebra.pdf',
                'professor_subject_id' => 1
            ],
            [
                'title' => 'Programming Fundamentals',
                'file_path' => '/lectures/programming_basics.pdf',
                'professor_subject_id' => 3
            ],
            [
                'title' => 'Data Structures',
                'file_path' => '/lectures/data_structures.pdf',
                'professor_subject_id' => 3
            ],
            [
                'title' => 'Classical Mechanics',
                'file_path' => '/lectures/classical_mechanics.pdf',
                'professor_subject_id' => 2
            ],
            [
                'title' => 'Quantum Physics Introduction',
                'file_path' => '/lectures/quantum_physics.pdf',
                'professor_subject_id' => 4
            ],
            [
                'title' => 'Organic Chemistry',
                'file_path' => '/lectures/organic_chemistry.pdf',
                'professor_subject_id' => 5
            ],
            [
                'title' => 'Cell Biology',
                'file_path' => '/lectures/cell_biology.pdf',
                'professor_subject_id' => 6
            ],
            [
                'title' => 'Shakespeare Studies',
                'file_path' => '/lectures/shakespeare.pdf',
                'professor_subject_id' => 7
            ],
            [
                'title' => 'World War II History',
                'file_path' => '/lectures/wwii_history.pdf',
                'professor_subject_id' => 8
            ],
        ];

        foreach ($lectures as $lectureData) {
            Lecture::create($lectureData);
        }
    }
}