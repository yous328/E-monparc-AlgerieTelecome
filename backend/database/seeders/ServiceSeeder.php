<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Service;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $services = ['Standard', 'Premium', 'Express'];
        foreach ($services as $name) {
            Service::firstOrCreate(['name' => $name]);
        }
    }
}
