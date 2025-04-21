<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\VehicleBrand;
use App\Models\EngineType;
use App\Models\FuelType;

class EngineTypeSeeder extends Seeder
{
    public function run(): void
    {
        $brands = [
            [
                'name' => 'Peugeot',
                'engine_types' => [
                    ['name' => 'PureTech Petrol', 'capacity' => '1.2L', 'fuel_type' => 'Petrol'],
                    ['name' => 'BlueHDi Diesel', 'capacity' => '1.5L', 'fuel_type' => 'Diesel'],
                    ['name' => 'Hybrid4', 'capacity' => '1.6L + Electric', 'fuel_type' => 'Hybrid'],
                    ['name' => 'Electric (e-208)', 'capacity' => '100 kW', 'fuel_type' => 'Electric'],
                ]
            ],
            [
                'name' => 'Renault',
                'engine_types' => [
                    ['name' => 'TCe Petrol', 'capacity' => '1.3L', 'fuel_type' => 'Petrol'],
                    ['name' => 'dCi Diesel', 'capacity' => '1.5L', 'fuel_type' => 'Diesel'],
                    ['name' => 'E-Tech Hybrid', 'capacity' => '1.6L + Electric', 'fuel_type' => 'Hybrid'],
                    ['name' => 'Electric (Z.E.)', 'capacity' => '80 kW', 'fuel_type' => 'Electric'],
                ]
            ],
            [
                'name' => 'Hyundai',
                'engine_types' => [
                    ['name' => 'Kappa Petrol', 'capacity' => '1.2L', 'fuel_type' => 'Petrol'],
                    ['name' => 'CRDi Diesel', 'capacity' => '1.6L', 'fuel_type' => 'Diesel'],
                    ['name' => 'Smartstream Hybrid', 'capacity' => '1.6L + Electric', 'fuel_type' => 'Hybrid'],
                    ['name' => 'Electric (Kona/Ioniq)', 'capacity' => '100–150 kW', 'fuel_type' => 'Electric'],
                ]
            ],
            [
                'name' => 'Toyota',
                'engine_types' => [
                    ['name' => 'VVT-i Petrol', 'capacity' => '1.5L', 'fuel_type' => 'Petrol'],
                    ['name' => 'D-4D Diesel', 'capacity' => '1.4L', 'fuel_type' => 'Diesel'],
                    ['name' => 'Hybrid Synergy Drive (THS)', 'capacity' => '1.8L + Electric', 'fuel_type' => 'Hybrid'],
                    ['name' => 'Electric (bZ4X)', 'capacity' => '150 kW', 'fuel_type' => 'Electric'],
                ]
            ],
            [
                'name' => 'Dacia',
                'engine_types' => [
                    ['name' => 'TCe Petrol', 'capacity' => '1.0L', 'fuel_type' => 'Petrol'],
                    ['name' => 'dCi Diesel', 'capacity' => '1.5L', 'fuel_type' => 'Diesel'],
                    ['name' => 'Bi-Fuel (Petrol + LPG)', 'capacity' => '1.0L', 'fuel_type' => 'LPG'],
                    ['name' => 'Hybrid (E-Tech)', 'capacity' => '1.6L + Electric', 'fuel_type' => 'Hybrid'],
                ]
            ],
            [
                'name' => 'Volkswagen',
                'engine_types' => [
                    ['name' => 'TSI Petrol', 'capacity' => '1.0L – 2.0L', 'fuel_type' => 'Petrol'],
                    ['name' => 'TDI Diesel', 'capacity' => '1.6L – 2.0L', 'fuel_type' => 'Diesel'],
                    ['name' => 'eHybrid (PHEV)', 'capacity' => '1.4L + Electric', 'fuel_type' => 'Hybrid'],
                    ['name' => 'Electric (ID Series)', 'capacity' => '150–220 kW', 'fuel_type' => 'Electric'],
                ]
            ],
            [
                'name' => 'Kia',
                'engine_types' => [
                    ['name' => 'MPI Petrol', 'capacity' => '1.2L', 'fuel_type' => 'Petrol'],
                    ['name' => 'T-GDI Petrol', 'capacity' => '1.0L – 1.6L', 'fuel_type' => 'Petrol'],
                    ['name' => 'CRDi Diesel', 'capacity' => '1.6L', 'fuel_type' => 'Diesel'],
                    ['name' => 'Electric (EV6)', 'capacity' => '125–239 kW', 'fuel_type' => 'Electric'],
                ]
            ],
            [
                'name' => 'Fiat',
                'engine_types' => [
                    ['name' => 'FireFly Petrol', 'capacity' => '1.0L – 1.3L', 'fuel_type' => 'Petrol'],
                    ['name' => 'TwinAir Petrol', 'capacity' => '0.9L', 'fuel_type' => 'Petrol'],
                    ['name' => 'Multijet Diesel', 'capacity' => '1.3L – 1.6L', 'fuel_type' => 'Diesel'],
                    ['name' => 'Electric (500e)', 'capacity' => '87 kW', 'fuel_type' => 'Electric'],
                ]
            ],
            [
                'name' => 'Seat',
                'engine_types' => [
                    ['name' => 'TSI Petrol', 'capacity' => '1.0L – 2.0L', 'fuel_type' => 'Petrol'],
                    ['name' => 'TDI Diesel', 'capacity' => '1.6L – 2.0L', 'fuel_type' => 'Diesel'],
                    ['name' => 'e-HYBRID (PHEV)', 'capacity' => '1.4L + Electric', 'fuel_type' => 'Hybrid'],
                    ['name' => 'Electric (Mii)', 'capacity' => '61 kW', 'fuel_type' => 'Electric'],
                ]
            ],
        ];

        foreach ($brands as $brand) {
            $brandModel = VehicleBrand::firstOrCreate(['name' => $brand['name']]);

            foreach ($brand['engine_types'] as $engine) {
                $fuel = FuelType::firstOrCreate(['name' => $engine['fuel_type']]);

                EngineType::firstOrCreate([
                    'brandID' => $brandModel->brandID,
                    'name' => $engine['name'],
                    'capacity' => $engine['capacity'],
                    'fuelTypeID' => $fuel->fuelTypeID,
                ]);
            }
        }
    }
}

