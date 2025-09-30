<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Professor;

class ProfessorSeeder extends Seeder
{
    public function run(): void
    {
        // Create professors from users 2-10 (excluding admin user)
        $professors = [
            ['user_id' => 2], // John Smith
            ['user_id' => 3], // Sarah Johnson
            ['user_id' => 4], // Michael Brown
            ['user_id' => 5], // Emily Davis
            ['user_id' => 6], // David Wilson
            ['user_id' => 7], // Lisa Anderson
            ['user_id' => 8], // James Taylor
            ['user_id' => 9], // Anna Martinez
            ['user_id' => 10], // Robert Garcia
        ];

        foreach ($professors as $professorData) {
            Professor::create($professorData);
        }
    }
}