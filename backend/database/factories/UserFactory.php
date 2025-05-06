<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Database\Factories\Providers\AlgerianNameProvider;

/**
 * @extends Factory<User>
 */
class UserFactory extends Factory
{
    protected static ?string $password = null;

    public function definition(): array
    {
        $faker = $this->faker;
        $faker->addProvider(new AlgerianNameProvider($faker));

        $gender = $faker->randomElement(['male', 'female']);

        return [
            'first_name'       => $faker->algerianFirstName($gender),
            'last_name'        => $faker->algerianLastName(),
            'gender'           => $gender,
            'birth_date'       => $faker->date('Y-m-d', '2000-01-01'),
            'address'          => $faker->address(),
            'phone_number'     => '+213 ' . $faker->numerify('5## ## ## ##'),
            'email'            => $this->faker->unique()->userName() . rand(1000, 99999) . '@example.com',
            'email_verified_at'=> now(),
            'password'         => static::$password ??= Hash::make('password'), // Caches the hash
            'role'             => 'Admin', // Change dynamically in Seeder if needed
            'profile_image'    => null,
            'description'      => $faker->sentence(),
        ];
    }

    public function unverified(): static
    {
        return $this->state(fn(array $attributes) => [
            'email_verified_at' => null,
        ]);
    }

    /**
     * Optional: Custom state for roles
     */
    public function role(string $role): static
    {
        return $this->state(fn(array $attributes) => [
            'role' => $role,
        ]);
    }
}
