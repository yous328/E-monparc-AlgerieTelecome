<?php

namespace Database\Seeders;

use App\Models\ProblemReport;
use App\Models\ProblemType;
use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Database\Seeder;

class ProblemReportSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::firstOrCreate([
            'email' => 'driver@example.com'
        ], [
            'first_name' => 'Driver',
            'last_name' => 'One',
            'birth_date' => '1990-01-01',
            'password' => bcrypt('password'),
            'role' => 'Driver'
        ]);

        $vehicle = Vehicle::firstOrCreate([
            'registration_number' => '123-ABC-45'
        ], [
            'brandID' => 1,
            'vehicleTypeID' => 1,
            'engineTypeID' => 1,
            'fuelTypeID' => 1,
            'colorID' => 1,
            'status' => 'Available',
            'serviceID' => 1,
            'mileage' => 50000
        ]);

        $problemType = ProblemType::firstOrCreate([
            'name' => 'Flat Tire'
        ]);

        ProblemReport::factory()->count(5)->create([
            'vehicleID' => $vehicle->vehicleID,
            'reported_by' => $user->id,
            'problem_type_id' => $problemType->problemTypeID,
        ]);
    }
}
