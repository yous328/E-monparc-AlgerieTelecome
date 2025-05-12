<?php

namespace Database\Factories;

use App\Models\Driver;
use App\Models\User;
use App\Models\Vehicle;
use App\Models\VehicleUsageHistory;
use Illuminate\Database\Eloquent\Factories\Factory;

class VehicleUsageHistoryFactory extends Factory
{
    protected $model = VehicleUsageHistory::class;

    public function definition(): array
    {

        $driver = Driver::inRandomOrder()->first() ?? Driver::factory()->create();
        $user = $driver->user ?? User::find($driver->userID);

        return [
            'driver_name' => $user ? $user->first_name . ' ' . $user->last_name : 'Inconnu',

            'driver_phone' => $user->phone_number ?? '+213 555 00 00 00',

            'usage_date' => $this->faker->dateTimeBetween('-3 months', 'now')->format('Y-m-d'),

            'route' => $this->faker->randomElement(['Alger', 'Tlemcen', 'Oran', 'Sétif', 'Bejaia'])
                        . ' → ' . $this->faker->randomElement(['Annaba', 'Batna', 'Constantine', 'Blida']),

            'distance_km' => $this->faker->randomFloat(1, 10, 500),

            'average_speed' => $this->faker->randomFloat(1, 30, 120),
        ];
    }
}
