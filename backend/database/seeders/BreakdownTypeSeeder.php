<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\BreakdownType;

class BreakdownTypeSeeder extends Seeder
{
    public function run()
    {
        // Add default breakdown types if they don't exist
        $types = [
            ['name' => 'Mechanical'],
            ['name' => 'Electrical'],
            ['name' => 'Engine'],
            ['name' => 'Transmission'],
            ['name' => 'Brakes'],
            ['name' => 'Suspension'],
            ['name' => 'Battery'],
            ['name' => 'Tires'],
            ['name' => 'Other']
        ];

        foreach ($types as $type) {
            // Only create if it doesn't exist
            BreakdownType::firstOrCreate(['name' => $type['name']]);
        }
    }
} 