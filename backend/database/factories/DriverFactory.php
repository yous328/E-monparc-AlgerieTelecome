<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Driver;
use App\Models\LicenseType;

class DriverFactory extends Factory
{
    protected $model = Driver::class;

    public function definition(): array
    {
        return [
            'userID' => User::factory()->state(['role' => 'Driver']),
            'license_number' => 'DZ-' . $this->faker->numerify('######'),
            'status' => $this->faker->randomElement(['Available', 'OnMission', 'Resting', 'Unavailable']),
            'licenseTypeID' => LicenseType::factory(),
        ];
    }
}
