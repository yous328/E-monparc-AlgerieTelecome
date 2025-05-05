<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MissionType;

class MissionTypeSeeder extends Seeder
{
    public function run(): void
    {
        MissionType::factory()->create();
    }
}