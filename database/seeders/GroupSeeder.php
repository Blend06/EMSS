<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Group;

class GroupSeeder extends Seeder
{
    public function run(): void
    {
        $groups = [
            ['group' => 'CS-101', 'semester_id' => 1], // Fall 2024
            ['group' => 'CS-102', 'semester_id' => 1],
            ['group' => 'MATH-101', 'semester_id' => 1],
            ['group' => 'PHYS-101', 'semester_id' => 1],
            ['group' => 'CHEM-101', 'semester_id' => 1],
            ['group' => 'CS-201', 'semester_id' => 2], // Spring 2025
            ['group' => 'CS-202', 'semester_id' => 2],
            ['group' => 'MATH-201', 'semester_id' => 2],
            ['group' => 'ENG-101', 'semester_id' => 2],
            ['group' => 'HIST-101', 'semester_id' => 2],
        ];

        foreach ($groups as $groupData) {
            Group::create($groupData);
        }
    }
}