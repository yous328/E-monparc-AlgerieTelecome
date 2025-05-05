<?php

namespace Database\Seeders;

use App\Models\MissionType;
use App\Models\Vehicle;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            FuelTypeSeeder::class,
            VehicleTypeSeeder::class,
            ColorSeeder::class,
            VehicleBrandSeeder::class,
            VehicleMaintenanceSeeder::class,
            EngineTypeSeeder::class,
            VehicleSeeder::class,
            ManagerSeeder::class,
            LicenseTypeSeeder::class,
            DriverSeeder::class,
            EmployeeSeeder::class,
            MissionTypeSeeder::class,
            MissionSeeder::class,
            MissionPlanSeeder::class,
            EmployeeAccompanimentSeeder::class,
            NotificationSeeder::class
        ]);
    }
}
