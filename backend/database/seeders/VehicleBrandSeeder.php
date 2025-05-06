<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\VehicleBrand;

class VehicleBrandSeeder extends Seeder
{
    public function run(): void
    {
        // Create 10 random vehicle brands using the factory
        VehicleBrand::factory()->count(10)->create();
    }
}
