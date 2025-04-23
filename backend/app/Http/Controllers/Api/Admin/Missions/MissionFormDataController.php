<?php

namespace App\Http\Controllers\Api\Admin\Missions;

use App\Http\Controllers\Controller;
use App\Models\Vehicle;
use App\Models\Driver;
use App\Models\Employee;
use App\Models\MissionType;
use App\Models\MissionObjective;
use Illuminate\Http\JsonResponse;

class MissionFormDataController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'vehicles' => Vehicle::where('status', 'Available')->get(),
            'drivers' => Driver::where('status', 'Available')->with('user')->get(),
            'employees' => Employee::where('status', 'Available')->with('user')->get(),
            'missionTypes' => MissionType::all(),
            'objectives' => MissionObjective::all(),
        ]);
    }
}
