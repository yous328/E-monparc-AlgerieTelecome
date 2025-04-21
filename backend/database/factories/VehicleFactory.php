<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\VehicleBrand;
use App\Models\VehicleType;
use App\Models\EngineType;
use App\Models\FuelType;
use App\Models\Color;
use App\Models\Service;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Vehicle>
 */
class VehicleFactory extends Factory
{
    public function definition(): array
    {
        return [
            'registration_number' => strtoupper($this->faker->bothify('###-??-16')),

            'brandID' => VehicleBrand::inRandomOrder()->value('brandID') 
                ?? VehicleBrand::create(['name' => 'Peugeot'])->brandID,

            'vehicleTypeID' => VehicleType::inRandomOrder()->value('vehicleTypeID') 
                ?? VehicleType::create(['name' => 'SUV'])->vehicleTypeID,

            'engineTypeID' => EngineType::inRandomOrder()->value('engineTypeID') 
                ?? EngineType::create([
                    'name' => 'Hybrid4',
                    'capacity' => '1.6L + Electric',
                    'brandID' => VehicleBrand::first()->brandID,
                    'fuelTypeID' => FuelType::first()->fuelTypeID,
                ])->engineTypeID,

            'fuelTypeID' => FuelType::inRandomOrder()->value('fuelTypeID') 
                ?? FuelType::create(['name' => 'Petrol'])->fuelTypeID,

            'colorID' => Color::inRandomOrder()->value('colorID') 
                ?? Color::create(['name' => 'Black'])->colorID,

            'serviceID' => Service::inRandomOrder()->value('serviceID') 
                ?? Service::create(['name' => 'Standard'])->serviceID,

            'mileage' => $this->faker->numberBetween(10000, 150000),
            'vehicleInsuranceID' => null,
            'technicalControlID' => null
        ];
    }
}
