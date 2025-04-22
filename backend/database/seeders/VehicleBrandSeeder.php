<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\VehicleBrand;

class VehicleBrandSeeder extends Seeder
{
    public function run(): void
    {
        $brands = [
            ['name' => 'Peugeot'],
            ['name' => 'Renault'],
            ['name' => 'Hyundai'],
            ['name' => 'Toyota'],
            ['name' => 'Dacia'],
            ['name' => 'Volkswagen'],
            ['name' => 'Kia'],
            ['name' => 'Fiat'],
            ['name' => 'Seat'],
        ];

        foreach ($brands as $brand) {
            $brandModel = VehicleBrand::firstOrCreate(['name' => $brand['name']]);
        }
    }
}
