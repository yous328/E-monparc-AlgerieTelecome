<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Vehicle;
use App\Models\VehicleMaintenance;

class VehicleMaintenanceSeeder extends Seeder
{
    public function run(): void
    {
        if (Vehicle::count() === 0) {
            Vehicle::factory()->count(10)->create();
        }
    
        VehicleMaintenance::factory()->count(10)->create();
    }
}