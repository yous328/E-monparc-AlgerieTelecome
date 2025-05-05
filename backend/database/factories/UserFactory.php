<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Database\Factories\Providers\AlgerianNameProvider;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $faker = $this->faker;
        $faker->addProvider(new AlgerianNameProvider($faker));

        $gender = $this->faker->randomElement(['male', 'female']);

        return [
            'first_name' => $faker->algerianFirstName($gender),
            'last_name'  => $faker->algerianLastName(),
            'gender'     => $gender,
            'birth_date' => $this->faker->date('Y-m-d', '2000-01-01'),
            'address' => $this->faker->address(),
            'phone_number' => '+213 ' . $this->faker->numerify('5## ## ## ##'),
            'email' => $this->faker->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => bcrypt('password'),
            'role' => 'Admin', // or Driver/Employee dynamically in Seeder
            'profile_image' => null,
            'description' => $this->faker->sentence(),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn(array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
