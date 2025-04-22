<?php

namespace App\Http\Controllers\Api\Admin\Missions;

use App\Http\Controllers\Controller;
use App\Models\Vehicle;
use App\Models\Driver;
use App\Models\Employee;
use App\Models\MissionType;
use App\Models\MissionObjective;

class MissionFormDataController extends Controller
{
    public function index()
    {
        return response()->json([
            'vehicles' => Vehicle::all(),
            'drivers' => Driver::all(),
            'employees' => Employee::all(),
            'missionTypes' => MissionType::all(),
            'objectives' => MissionObjective::all(),
        ]);
    }
}
