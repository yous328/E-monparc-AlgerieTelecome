<?php

namespace App\Http\Controllers\Api\Admin\Missions;

use App\Http\Controllers\Controller;
use App\Models\MissionPlan;
use Illuminate\Http\Request;

class MissionPlanController extends Controller
{
    public function index()
    {
        return MissionPlan::with(['mission', 'driver'])->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'missionID' => 'required|exists:missions,missionID',
            'driverID' => 'required|exists:drivers,driverID',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'mission_type' => 'required|in:short,long',
            'complexity' => 'nullable|in:simple,medium,complex',
        ]);

        return MissionPlan::create($validated);
    }
}
