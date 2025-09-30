<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Semester;

class SemesterSeeder extends Seeder
{
    public function run(): void
    {
        $semesters = [
            ['semester' => 'Fall 2024', 'year_id' => 5], // 2024-2025
            ['semester' => 'Spring 2025', 'year_id' => 5],
            ['semester' => 'Fall 2023', 'year_id' => 4], // 2023-2024
            ['semester' => 'Spring 2024', 'year_id' => 4],
            ['semester' => 'Fall 2022', 'year_id' => 3], // 2022-2023
            ['semester' => 'Spring 2023', 'year_id' => 3],
            ['semester' => 'Fall 2025', 'year_id' => 6], // 2025-2026
            ['semester' => 'Spring 2026', 'year_id' => 6],
            ['semester' => 'Summer 2024', 'year_id' => 5],
            ['semester' => 'Summer 2025', 'year_id' => 6],
        ];

        foreach ($semesters as $semesterData) {
            Semester::create($semesterData);
        }
    }
}