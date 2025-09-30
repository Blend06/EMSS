<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Clear all tables in reverse dependency order
        \DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        
        \App\Models\Attendance::truncate();
        \App\Models\Grade::truncate();
        \App\Models\Schedule::truncate();
        \App\Models\Lecture::truncate();
        \App\Models\Professor_Subject::truncate();
        \App\Models\Classes::truncate();
        \App\Models\Student::truncate();
        \App\Models\Group::truncate();
        \App\Models\Professor::truncate();
        \App\Models\Subject::truncate();
        \App\Models\Semester::truncate();
        \App\Models\Year::truncate();
        \App\Models\User::truncate();
        
        \DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $this->call([
            UserSeeder::class,
            YearSeeder::class,
            SemesterSeeder::class,
            SubjectSeeder::class,
            ProfessorSeeder::class,
            GroupSeeder::class,
            StudentSeeder::class,
            ClassesSeeder::class,
            ProfessorSubjectSeeder::class,
            LectureSeeder::class,
            ScheduleSeeder::class,
            GradeSeeder::class,
            AttendanceSeeder::class,
        ]);
    }
}