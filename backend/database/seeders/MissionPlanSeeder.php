<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MissionPlan;

class MissionPlanSeeder extends Seeder
{
    public function run(): void
    {
        MissionPlan::factory()->count(20)->create();
    }
}
