<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Vehicle;

class VehicleSeeder extends Seeder
{
    public function run(): void
    {
        $totalVehicles = 1800;

        $distribution = [
            'On Mission'    => 0.5,
            'Available'     => 0.3,
            'In Breakdown'  => 0.2,
        ];

        foreach ($distribution as $status => $percentage) {
            $count = (int) round($totalVehicles * $percentage);
            Vehicle::factory()
                ->count($count)
                ->state(['status' => $status])
                ->create();
        }
    }
}
