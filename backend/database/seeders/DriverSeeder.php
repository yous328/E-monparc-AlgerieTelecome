<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Driver;

class DriverSeeder extends Seeder
{
    public function run(): void
    {
        $totalDrivers = 350;

        $distribution = [
            'On Mission'   => 0.5,
            'Available'    => 0.3,
            'Unavailable'  => 0.2,
        ];

        // Optional: Validate that percentages add up to 1
        $totalPercentage = array_sum($distribution);
        if (abs($totalPercentage - 1.0) > 0.01) {
            throw new \Exception("Distribution percentages must add up to 1.0. Current sum: $totalPercentage");
        }

        foreach ($distribution as $status => $percentage) {
            $count = (int) round($totalDrivers * $percentage);

            Driver::factory()
                ->count($count)
                ->state([
                    'status' => $status,
                ])
                ->create();
        }
    }
}
