<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Year;

class YearSeeder extends Seeder
{
    public function run(): void
    {
        $years = [
            ['academic_year' => '2020-2021'],
            ['academic_year' => '2021-2022'],
            ['academic_year' => '2022-2023'],
            ['academic_year' => '2023-2024'],
            ['academic_year' => '2024-2025'],
            ['academic_year' => '2025-2026'],
            ['academic_year' => '2026-2027'],
            ['academic_year' => '2027-2028'],
            ['academic_year' => '2028-2029'],
            ['academic_year' => '2029-2030'],
        ];

        foreach ($years as $yearData) {
            Year::create($yearData);
        }
    }
}