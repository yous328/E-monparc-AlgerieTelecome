<?php

namespace Database\Factories;

use App\Models\VehicleBrand;
use Illuminate\Database\Eloquent\Factories\Factory;

class VehicleBrandFactory extends Factory
{
    protected $model = VehicleBrand::class;

    public function definition(): array
    {
        // Generate a brand logo image in the correct directory
        $logoFilename = $this->faker->image(
            storage_path('app/public/vehicles/brandsImg'),
            400,
            400,
            'transport',
            false
        );

        $logoFilename = 'Volkswagen.png';

        return [
            'name' => $this->faker->randomElement([
                'Toyota',
                'Peugeot',
                'Hyundai',
                'Renault',
                'Ford',
                'Nissan',
                'Volkswagen',
                'Fiat',
                'Seat',
                'Kia'
            ]),
            // Store relative path from 'public/storage'
            'logo' => 'vehicles/brandsImg/' . basename($logoFilename),
        ];
    }
}
