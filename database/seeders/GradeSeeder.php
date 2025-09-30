<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Grade;

class GradeSeeder extends Seeder
{
    public function run(): void
    {
        $grades = [
            [
                'student_id' => 1,
                'professor_subject_id' => 1,
                'grade' => 4.50,
                'date' => '2024-10-15'
            ],
            [
                'student_id' => 1,
                'professor_subject_id' => 3,
                'grade' => 4.20,
                'date' => '2024-10-20'
            ],
            [
                'student_id' => 2,
                'professor_subject_id' => 1,
                'grade' => 3.80,
                'date' => '2024-10-15'
            ],
            [
                'student_id' => 2,
                'professor_subject_id' => 3,
                'grade' => 4.00,
                'date' => '2024-10-20'
            ],
            [
                'student_id' => 3,
                'professor_subject_id' => 2,
                'grade' => 4.75,
                'date' => '2024-10-18'
            ],
            [
                'student_id' => 3,
                'professor_subject_id' => 4,
                'grade' => 3.90,
                'date' => '2024-10-22'
            ],
            [
                'student_id' => 4,
                'professor_subject_id' => 2,
                'grade' => 4.10,
                'date' => '2024-10-18'
            ],
            [
                'student_id' => 4,
                'professor_subject_id' => 4,
                'grade' => 4.30,
                'date' => '2024-10-22'
            ],
            [
                'student_id' => 5,
                'professor_subject_id' => 5,
                'grade' => 3.70,
                'date' => '2024-10-25'
            ],
            [
                'student_id' => 1,
                'professor_subject_id' => 2,
                'grade' => 4.60,
                'date' => '2024-10-28'
            ],
        ];

        foreach ($grades as $gradeData) {
            Grade::create($gradeData);
        }
    }
}