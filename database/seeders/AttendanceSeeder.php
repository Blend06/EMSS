<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Attendance;

class AttendanceSeeder extends Seeder
{
    public function run(): void
    {
        $attendances = [
            [
                'student_id' => 1,
                'absences' => 2,
                'professor_subject_id' => 1
            ],
            [
                'student_id' => 1,
                'absences' => 1,
                'professor_subject_id' => 3
            ],
            [
                'student_id' => 2,
                'absences' => 0,
                'professor_subject_id' => 1
            ],
            [
                'student_id' => 2,
                'absences' => 3,
                'professor_subject_id' => 3
            ],
            [
                'student_id' => 3,
                'absences' => 1,
                'professor_subject_id' => 2
            ],
            [
                'student_id' => 3,
                'absences' => 2,
                'professor_subject_id' => 4
            ],
            [
                'student_id' => 4,
                'absences' => 0,
                'professor_subject_id' => 2
            ],
            [
                'student_id' => 4,
                'absences' => 1,
                'professor_subject_id' => 4
            ],
            [
                'student_id' => 5,
                'absences' => 4,
                'professor_subject_id' => 5
            ],
            [
                'student_id' => 1,
                'absences' => 1,
                'professor_subject_id' => 2
            ],
        ];

        foreach ($attendances as $attendanceData) {
            Attendance::create($attendanceData);
        }
    }
}