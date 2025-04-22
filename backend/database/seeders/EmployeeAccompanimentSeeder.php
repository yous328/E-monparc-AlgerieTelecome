<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\EmployeeAccompaniment;

class EmployeeAccompanimentSeeder extends Seeder
{
    public function run(): void
    {
        EmployeeAccompaniment::factory()->count(10)->create();
    }
}
