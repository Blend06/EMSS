<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            [
                'firstname' => 'Admin',
                'lastname' => 'User',
                'birthdate' => '1985-01-15',
                'email' => 'admin@school.edu',
                'phone' => '+355691234567',
                'password' => Hash::make('password'),
                'isAdmin' => true,
            ],
            [
                'firstname' => 'John',
                'lastname' => 'Smith',
                'birthdate' => '1980-03-22',
                'email' => 'john.smith@school.edu',
                'phone' => '+355691234568',
                'password' => Hash::make('password'),
                'isAdmin' => false,
            ],
            [
                'firstname' => 'Sarah',
                'lastname' => 'Johnson',
                'birthdate' => '1982-07-10',
                'email' => 'sarah.johnson@school.edu',
                'phone' => '+355691234569',
                'password' => Hash::make('password'),
                'isAdmin' => false,
            ],
            [
                'firstname' => 'Michael',
                'lastname' => 'Brown',
                'birthdate' => '1978-11-05',
                'email' => 'michael.brown@school.edu',
                'phone' => '+355691234570',
                'password' => Hash::make('password'),
                'isAdmin' => false,
            ],
            [
                'firstname' => 'Emily',
                'lastname' => 'Davis',
                'birthdate' => '1983-09-18',
                'email' => 'emily.davis@school.edu',
                'phone' => '+355691234571',
                'password' => Hash::make('password'),
                'isAdmin' => false,
            ],
            [
                'firstname' => 'David',
                'lastname' => 'Wilson',
                'birthdate' => '1979-12-03',
                'email' => 'david.wilson@school.edu',
                'phone' => '+355691234572',
                'password' => Hash::make('password'),
                'isAdmin' => false,
            ],
            [
                'firstname' => 'Lisa',
                'lastname' => 'Anderson',
                'birthdate' => '1981-04-25',
                'email' => 'lisa.anderson@school.edu',
                'phone' => '+355691234573',
                'password' => Hash::make('password'),
                'isAdmin' => false,
            ],
            [
                'firstname' => 'James',
                'lastname' => 'Taylor',
                'birthdate' => '1984-08-14',
                'email' => 'james.taylor@school.edu',
                'phone' => '+355691234574',
                'password' => Hash::make('password'),
                'isAdmin' => false,
            ],
            [
                'firstname' => 'Anna',
                'lastname' => 'Martinez',
                'birthdate' => '1986-02-28',
                'email' => 'anna.martinez@school.edu',
                'phone' => '+355691234575',
                'password' => Hash::make('password'),
                'isAdmin' => false,
            ],
            [
                'firstname' => 'Robert',
                'lastname' => 'Garcia',
                'birthdate' => '1977-06-12',
                'email' => 'robert.garcia@school.edu',
                'phone' => '+355691234576',
                'password' => Hash::make('password'),
                'isAdmin' => false,
            ],
            // Student users
            [
                'firstname' => 'Alex',
                'lastname' => 'Thompson',
                'birthdate' => '2002-01-15',
                'email' => 'alex.thompson@student.edu',
                'phone' => '+355691234577',
                'password' => Hash::make('password'),
                'isAdmin' => false,
            ],
            [
                'firstname' => 'Maria',
                'lastname' => 'Rodriguez',
                'birthdate' => '2001-05-20',
                'email' => 'maria.rodriguez@student.edu',
                'phone' => '+355691234578',
                'password' => Hash::make('password'),
                'isAdmin' => false,
            ],
            [
                'firstname' => 'Kevin',
                'lastname' => 'Lee',
                'birthdate' => '2002-09-08',
                'email' => 'kevin.lee@student.edu',
                'phone' => '+355691234579',
                'password' => Hash::make('password'),
                'isAdmin' => false,
            ],
            [
                'firstname' => 'Sophie',
                'lastname' => 'White',
                'birthdate' => '2001-12-12',
                'email' => 'sophie.white@student.edu',
                'phone' => '+355691234580',
                'password' => Hash::make('password'),
                'isAdmin' => false,
            ],
            [
                'firstname' => 'Daniel',
                'lastname' => 'Clark',
                'birthdate' => '2002-03-30',
                'email' => 'daniel.clark@student.edu',
                'phone' => '+355691234581',
                'password' => Hash::make('password'),
                'isAdmin' => false,
            ],
        ];

        foreach ($users as $userData) {
            User::create($userData);
        }
    }
}