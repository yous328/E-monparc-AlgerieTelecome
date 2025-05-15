<?php

namespace Database\Seeders;

use App\Models\MaintenanceType;
use Illuminate\Database\Seeder;

class MaintenanceTypesTableSeeder extends Seeder
{
    public function run()
    {
        MaintenanceType::create(['name' => 'OilChange', 'default_interval_km' => 5000]);
        MaintenanceType::create(['name' => 'Brakes', 'default_interval_km' => 10000]);
        MaintenanceType::create(['name' => 'Tires', 'default_interval_km' => 8000]);
        MaintenanceType::create(['name' => 'Battery', 'default_interval_km' => 10000]);
        MaintenanceType::create(['name' => 'SparkPlugs', 'default_interval_km' => 15000]);
        

    }
}