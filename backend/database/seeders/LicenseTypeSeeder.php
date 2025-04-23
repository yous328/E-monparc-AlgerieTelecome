<?php

namespace Database\Seeders;

use App\Models\LicenseType;
use Illuminate\Database\Seeder;

class LicenseTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $types = ['Permis A', 'Permis B', 'Permis C'];

        foreach ($types as $type) {
            LicenseType::firstOrCreate(['type' => $type]);
        }
    }
}
