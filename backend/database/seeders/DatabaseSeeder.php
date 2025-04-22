<?php

namespace Database\Seeders;


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
            ManagerSeeder::class,
            DriverSeeder::class,
            EmployeeSeeder::class,
            MissionSeeder::class,
            MissionPlanSeeder::class,
            EmployeeAccompanimentSeeder::class,
        ]);
    }
}
