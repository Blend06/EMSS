<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Schedule;

class ScheduleSeeder extends Seeder
{
    public function run(): void
    {
        $schedules = [
            [
                'time' => '08:00-09:30',
                'day' => 'monday',
                'group_id' => 1,
                'class_id' => 1,
                'professor_subject_id' => 1
            ],
            [
                'time' => '10:00-11:30',
                'day' => 'monday',
                'group_id' => 1,
                'class_id' => 2,
                'professor_subject_id' => 3
            ],
            [
                'time' => '08:00-09:30',
                'day' => 'tuesday',
                'group_id' => 2,
                'class_id' => 3,
                'professor_subject_id' => 2
            ],
            [
                'time' => '10:00-11:30',
                'day' => 'tuesday',
                'group_id' => 2,
                'class_id' => 4,
                'professor_subject_id' => 4
            ],
            [
                'time' => '14:00-15:30',
                'day' => 'wednesday',
                'group_id' => 3,
                'class_id' => 5,
                'professor_subject_id' => 5
            ],
            [
                'time' => '16:00-17:30',
                'day' => 'wednesday',
                'group_id' => 3,
                'class_id' => 6,
                'professor_subject_id' => 6
            ],
            [
                'time' => '08:00-09:30',
                'day' => 'thursday',
                'group_id' => 4,
                'class_id' => 7,
                'professor_subject_id' => 7
            ],
            [
                'time' => '10:00-11:30',
                'day' => 'thursday',
                'group_id' => 4,
                'class_id' => 8,
                'professor_subject_id' => 8
            ],
            [
                'time' => '14:00-15:30',
                'day' => 'friday',
                'group_id' => 5,
                'class_id' => 9,
                'professor_subject_id' => 9
            ],
            [
                'time' => '16:00-17:30',
                'day' => 'friday',
                'group_id' => 5,
                'class_id' => 10,
                'professor_subject_id' => 10
            ],
        ];

        foreach ($schedules as $scheduleData) {
            Schedule::create($scheduleData);
        }
    }
}