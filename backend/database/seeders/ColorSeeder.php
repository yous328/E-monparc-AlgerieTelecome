<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Color;

class ColorSeeder extends Seeder
{
    public function run(): void
    {
        $colors = ['White', 'Black', 'Gray', 'Silver', 'Blue', 'Red', 'Green', 'Yellow', 'Orange'];

        foreach ($colors as $color) {
            Color::firstOrCreate(['name' => $color]);
        }
    }
}
