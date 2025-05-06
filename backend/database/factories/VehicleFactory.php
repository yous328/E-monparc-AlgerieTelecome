<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Vehicle;
use App\Models\VehicleBrand;
use App\Models\VehicleType;
use App\Models\EngineType;
use App\Models\FuelType;
use App\Models\Color;
use App\Models\Service;
use App\Models\VehicleTechnicalStatus;
use App\Models\VehicleUsageHistory;
use Illuminate\Support\Str;

class VehicleFactory extends Factory
{
    protected $model = Vehicle::class;

    public function definition(): array
    {
        $this->faker->unique(true);

        $brandID = VehicleBrand::inRandomOrder()->value('brandID') 
            ?? VehicleBrand::factory()->create()->brandID;

        $fuelTypeID = FuelType::inRandomOrder()->value('fuelTypeID') 
            ?? FuelType::factory()->create()->fuelTypeID;

        $engineTypeID = EngineType::inRandomOrder()->value('engineTypeID') 
            ?? EngineType::factory()->create([
                'name' => 'Hybrid4',
                'capacity' => '1.6L + Electric',
                'brandID' => $brandID,
                'fuelTypeID' => $fuelTypeID,
            ])->engineTypeID;

        // Store fake image locally in `storage/app/public/vehicles`
        $fakeImageName = $this->faker->image(
            storage_path('app/public/vehicles'), 
            640, 
            480, 
            'transport', 
            false
        );
        $photoPath = 'vehicles/' . $fakeImageName;

        return [
            'registration_number' => strtoupper($this->faker->unique()->bothify('####-???-##')),
            'brandID' => $brandID,
            'vehicleTypeID' => VehicleType::inRandomOrder()->value('vehicleTypeID') 
                ?? VehicleType::factory()->create()->vehicleTypeID,
            'engineTypeID' => $engineTypeID,
            'fuelTypeID' => $fuelTypeID,
            'colorID' => Color::inRandomOrder()->value('colorID') 
                ?? Color::factory()->create()->colorID,
            'serviceID' => Service::inRandomOrder()->value('serviceID') 
                ?? Service::factory()->create()->serviceID,
            'status' => $this->faker->randomElement([
                'Available', 'On Mission', 'Under Maintenance', 'In Breakdown', 'Unavailable'
            ]),
            'mileage' => $this->faker->numberBetween(10000, 200000),
            'fuel_level' => $this->faker->randomFloat(1, 0, 100),
            'average_consumption' => $this->faker->randomFloat(2, 5, 15),
            'current_consumption' => $this->faker->randomFloat(2, 5, 15),
            'cost_per_km' => $this->faker->randomFloat(2, 50, 150),
            'daily_cost' => $this->faker->randomFloat(2, 1000, 10000),
            'vehicleInsuranceID' => null,
            'technicalControlID' => null,
            'last_maintenance_date' => $this->faker->optional()->date(),
            'next_available_date' => $this->faker->optional()->date(),
            'photo' => 'vehicles/Volkswagen.png',
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (Vehicle $vehicle) {
            $faker = \Faker\Factory::create();

            VehicleTechnicalStatus::factory()->create([
                'vehicleID' => $vehicle->vehicleID,
                'vidange_km' => 200000,
                'batterie_km' => 180000,
                'bougies_km' => 170000,
                'gaz_clim_km' => 160000,
                'chaine_km' => 150000,
                'panneaux_km' => 140000,
                'plaquettes_frein_km' => 130000,
                'filtres_km' => 120000,
            ]);

            VehicleUsageHistory::factory()->count(3)->create([
                'vehicleID' => $vehicle->vehicleID,
            ])->each(function ($history) use ($faker) {
                $history->update([
                    'driver_name' => $faker->name,
                    'driver_phone' => $faker->phoneNumber,
                    'usage_date' => $faker->date(),
                    'route' => $faker->city() . ' → ' . $faker->city(),
                    'distance_km' => $faker->numberBetween(20, 500),
                    'average_speed' => $faker->numberBetween(40, 100),
                ]);
            });
        });
    }
}
