<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Student;

class StudentSeeder extends Seeder
{
    public function run(): void
    {
        $students = [
            [
                'user_id' => 11, // Alex Thompson
                'id_card_number' => 'STU001',
                'conduct_grade' => 'E',
                'group_id' => 1,
                'caretaker_name' => 'John Thompson',
                'caretaker_phone' => '+355691111111',
                'status' => 'accepted'
            ],
            [
                'user_id' => 12, // Maria Rodriguez
                'id_card_number' => 'STU002',
                'conduct_grade' => 'S',
                'group_id' => 1,
                'caretaker_name' => 'Carlos Rodriguez',
                'caretaker_phone' => '+355691111112',
                'status' => 'accepted'
            ],
            [
                'user_id' => 13, // Kevin Lee
                'id_card_number' => 'STU003',
                'conduct_grade' => 'E',
                'group_id' => 2,
                'caretaker_name' => 'David Lee',
                'caretaker_phone' => '+355691111113',
                'status' => 'accepted'
            ],
            [
                'user_id' => 14, // Sophie White
                'id_card_number' => 'STU004',
                'conduct_grade' => 'E',
                'group_id' => 2,
                'caretaker_name' => 'Michael White',
                'caretaker_phone' => '+355691111114',
                'status' => 'accepted'
            ],
            [
                'user_id' => 15, // Daniel Clark
                'id_card_number' => 'STU005',
                'conduct_grade' => 'S',
                'group_id' => 3,
                'caretaker_name' => 'Robert Clark',
                'caretaker_phone' => '+355691111115',
                'status' => 'pending'
            ],
        ];



        foreach ($students as $studentData) {
            Student::create($studentData);
        }
    }
}