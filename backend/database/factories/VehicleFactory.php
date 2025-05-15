<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Vehicle;
use App\Models\VehicleModel;
use App\Models\VehicleType;
use App\Models\EngineType;
use App\Models\FuelType;
use App\Models\Color;
use App\Models\Service;
use App\Models\VehicleInsurance;
use App\Models\TechnicalControl;
use App\Models\VehicleTechnicalStatus;
use App\Models\VehicleUsageHistory;
use App\Models\MaintenanceType;
use App\Models\VehicleMaintenance;

class VehicleFactory extends Factory
{
    protected $model = Vehicle::class;

    public function definition(): array
    {
        $faker = $this->faker;

        $model = VehicleModel::inRandomOrder()->first();
        $brand = $model->brand;
        $type = $model->type;

        $fuelType = FuelType::inRandomOrder()->first() ?? FuelType::factory()->create();
        $engine = EngineType::inRandomOrder()->first() ?? EngineType::factory()->create([
            'name' => 'Hybrid',
            'capacity' => '1.8L',
            'brandID' => $brand->brandID,
            'fuelTypeID' => $fuelType->fuelTypeID,
        ]);

        $insurance = VehicleInsurance::factory()->create();
        $control = TechnicalControl::factory()->create();

        $months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        $monthlyKilometrage = collect($months)->map(function ($month) {
            return [
                'month' => $month,
                'days' => collect(range(1, 31))->mapWithKeys(fn($d) => [str_pad($d, 2, '0', STR_PAD_LEFT) => rand(0, 30)])
            ];
        });

        $missionStats = collect($months)->map(fn($m) => ['month' => $m, 'mission' => rand(0, 30)]);

        return [
            'registration_number' => strtoupper($faker->unique()->bothify('####-???-##')),
            'brandID' => $brand->brandID,
            'modelID' => $model->modelID,
            'vehicleTypeID' => $faker->boolean(80) ? $type->vehicleTypeID : VehicleType::inRandomOrder()->value('vehicleTypeID'),
            'engineTypeID' => $engine->engineTypeID,
            'fuelTypeID' => $fuelType->fuelTypeID,
            'colorID' => Color::inRandomOrder()->value('colorID') ?? Color::factory()->create()->colorID,
            'serviceID' => Service::inRandomOrder()->value('serviceID') ?? Service::factory()->create()->serviceID,
            'status' => $faker->randomElement(['Available', 'OnMission', 'UnderMaintenance']),
            'mileage' => $faker->numberBetween(10000, 200000),
            'fuel_level' => $faker->randomFloat(1, 0, 100),
            'average_consumption' => $faker->randomFloat(2, 9000, 25000),
            'current_consumption' => $faker->randomFloat(2, 3000, 20000),
            'cost_per_km' => $faker->randomFloat(2, 8, 16),
            'daily_cost' => $faker->randomFloat(2, 500, 3000),
            'vehicleInsuranceID' => $insurance->vehicleInsuranceID,
            'technicalControlID' => $control->technicalControlID,
            'last_maintenance_date' => $faker->date(),
            'next_available_date' => $faker->date(),
            'monthly_kilometrage' => $monthlyKilometrage,
            'mission_stats' => $missionStats,
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (Vehicle $vehicle) {
            // Create maintenance records for the vehicle
            $maintenanceTypes = MaintenanceType::inRandomOrder()->take(3)->get();
            foreach ($maintenanceTypes as $maintenanceType) {
                VehicleMaintenance::create([
                    'vehicleID' => $vehicle->vehicleID,
                    'maintenanceTypeID' => $maintenanceType->maintenanceTypeID,
                    'kilometrage' => $this->faker->numberBetween(1000, 100000),
                    'date' => $this->faker->date(),
                    'interval_km' => $this->faker->numberBetween(5000, 20000),
                ]);
            }

            VehicleTechnicalStatus::factory()->create(['vehicleID' => $vehicle->vehicleID]);
            VehicleUsageHistory::factory()->count(3)->create(['vehicleID' => $vehicle->vehicleID]);
        });
    }
}
