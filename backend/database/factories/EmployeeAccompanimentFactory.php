<?php

namespace Database\Factories;

use App\Models\EmployeeAccompaniment;
use App\Models\Employee;
use Illuminate\Database\Eloquent\Factories\Factory;

class EmployeeAccompanimentFactory extends Factory
{
    protected $model = EmployeeAccompaniment::class;

    public function definition(): array
    {
        return [
            'employee_accompaniment_id' => Employee::inRandomOrder()->value('employeeID') 
                ?? Employee::factory()->create()->employeeID,
        ];
    }
}
