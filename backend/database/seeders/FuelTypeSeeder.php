<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\FuelType;

class FuelTypeSeeder extends Seeder
{
    public function run(): void
    {
        // Generate 5 random fuel types using the factory
        FuelType::factory()->count(5)->create();
    }
}
