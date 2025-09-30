<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Classes;

class ClassesSeeder extends Seeder
{
    public function run(): void
    {
        $classes = [
            ['name' => 'Room A101'],
            ['name' => 'Room A102'],
            ['name' => 'Room A103'],
            ['name' => 'Room B201'],
            ['name' => 'Room B202'],
            ['name' => 'Room B203'],
            ['name' => 'Lab C301'],
            ['name' => 'Lab C302'],
            ['name' => 'Auditorium D401'],
            ['name' => 'Library Hall'],
        ];

        foreach ($classes as $classData) {
            Classes::create($classData);
        }
    }
}