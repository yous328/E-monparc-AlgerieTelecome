<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\VehicleBrand;
use App\Models\VehicleType;
use App\Models\EngineType;
use App\Models\FuelType;
use App\Models\Color;
use App\Models\Service;


class VehicleFactory extends Factory
{
    public function definition(): array
    {
        $brandID = VehicleBrand::inRandomOrder()->value('brandID') 
            ?? VehicleBrand::create(['name' => 'Peugeot'])->brandID;

        $fuelTypeID = FuelType::inRandomOrder()->value('fuelTypeID') 
            ?? FuelType::create(['name' => 'Petrol'])->fuelTypeID;

        return [
            'registration_number' => strtoupper($this->faker->bothify('###-??-16')),

            'brandID' => $brandID,

            'vehicleTypeID' => VehicleType::inRandomOrder()->value('vehicleTypeID') 
                ?? VehicleType::create(['name' => 'SUV'])->vehicleTypeID,

            'engineTypeID' => EngineType::inRandomOrder()->value('engineTypeID') 
                ?? EngineType::create([
                    'name' => 'Hybrid4',
                    'capacity' => '1.6L + Electric',
                    'brandID' => $brandID,
                    'fuelTypeID' => $fuelTypeID,
                ])->engineTypeID,

            'fuelTypeID' => $fuelTypeID,

            'colorID' => Color::inRandomOrder()->value('colorID') 
                ?? Color::create(['name' => 'Black'])->colorID,

            'serviceID' => Service::inRandomOrder()->value('serviceID') 
                ?? Service::create(['name' => 'Standard'])->serviceID,

            'status' => $this->faker->randomElement([
                'Available', 'On Mission', 'Under Maintenance', 'In Breakdown', 'Unavailable'
            ]),

            'mileage' => $this->faker->numberBetween(10000, 150000),

            'vehicleInsuranceID' => null,
            'technicalControlID' => null,

            'last_maintenance_date' => $this->faker->optional()->date(),
            'next_available_date' => $this->faker->optional()->date(),

            'photo' => $this->faker->optional()->imageUrl(640, 480, 'cars', true)
        ];
    }
}
