<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MaintenanceType;

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
            VehicleModelBrandTypeSeeder::class,
            MaintenanceTypesTableSeeder::class,
            EngineTypeSeeder::class,
            BreakdownTypeSeeder::class,
            VehicleSeeder::class,
            ManagerSeeder::class,
            LicenseTypeSeeder::class,
            DriverSeeder::class,
            EmployeeSeeder::class,
            MissionTypeSeeder::class,
            MissionObjectiveSeeder::class,
            MissionSeeder::class,
            MissionPlanSeeder::class,
            EmployeeAccompanimentSeeder::class,
            NotificationSeeder::class
        ]);
    }
}
