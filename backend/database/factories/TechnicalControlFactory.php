<?php

namespace Database\Factories;

use App\Models\TechnicalControl;
use Illuminate\Database\Eloquent\Factories\Factory;

class TechnicalControlFactory extends Factory
{
    protected $model = TechnicalControl::class;

    public function definition(): array
    {
        $controlDate = $this->faker->dateTimeBetween('-2 years', 'now');
        $expirationDate = (clone $controlDate)->modify('+1 year');

        return [
            'control_date' => $controlDate,
            'expiration_date' => $expirationDate,
            'status' => $this->faker->randomElement([
                'Neant',
                'Ajourne',
                'NonExigible',
                'ControlePartiel',
                'AttenteContreVisite',
                'ObservationsMineures',
                'NonControle',
                'Exempte'
            ]),
        ];
    }
}
