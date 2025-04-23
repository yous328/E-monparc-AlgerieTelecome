<?php

namespace App\Http\Controllers\Api\Admin\Missions;

use App\Http\Controllers\Controller;
use App\Models\MissionPlan;
use Illuminate\Http\JsonResponse;

class MissionPlanController extends Controller
{
    /**
     *  View all mission plans (with related mission + driver info)
     */
    public function index(): JsonResponse
    {
        $plans = MissionPlan::with([
            'mission.vehicle',
            'mission.missionObjective',
            'driver.user',
        ])->get();

        return response()->json($plans);
    }
}
