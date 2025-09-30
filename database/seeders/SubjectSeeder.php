<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Subject;

class SubjectSeeder extends Seeder
{
    public function run(): void
    {
        $subjects = [
            [
                'name' => 'Mathematics',
                'semester_id' => 1
            ],
            [
                'name' => 'Computer Science',
                'semester_id' => 1
            ],
            [
                'name' => 'Physics',
                'semester_id' => 1
            ],
            [
                'name' => 'Chemistry',
                'semester_id' => 1
            ],
            [
                'name' => 'Biology',
                'semester_id' => 2
            ],
            [
                'name' => 'English Literature',
                'semester_id' => 2
            ],
            [
                'name' => 'History',
                'semester_id' => 2
            ],
            [
                'name' => 'Economics',
                'semester_id' => 3
            ],
            [
                'name' => 'Psychology',
                'semester_id' => 3
            ],
            [
                'name' => 'Philosophy',
                'semester_id' => 3
            ],
        ];

        foreach ($subjects as $subjectData) {
            Subject::create($subjectData);
        }
    }
}