<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\VehicleType;

class VehicleTypeSeeder extends Seeder
{
    public function run(): void
    {
        $types = ['Hatchback', 'Sedan', 'SUV', 'Van', 'Electric'];

        foreach ($types as $type) {
            VehicleType::firstOrCreate(['name' => $type]);
        }
    }
}
