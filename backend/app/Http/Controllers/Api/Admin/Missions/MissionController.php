<?php

namespace App\Http\Controllers\Api\Admin\Missions;

use App\Http\Controllers\Controller;
use App\Models\Mission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MissionController extends Controller
{
    public function index()
    {
        return Mission::with([
            'vehicle',
            'driver',
            'accompanyingEmployee',
            'missionType',
            'missionObjective',
            'createdBy'
        ])->get();
    }

    public function show($id)
    {
        $mission = Mission::with([
            'vehicle',
            'driver',
            'accompanyingEmployee',
            'missionType',
            'missionObjective',
            'createdBy'
        ])->findOrFail($id);

        return response()->json($mission);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'vehicleID' => 'required|exists:vehicles,vehicleID',
            'driverID' => 'required|exists:drivers,driverID',
            'accompanyingEmployeeID' => 'nullable|exists:employees,employeeID',
            'missionTypeID' => 'required|exists:mission_types,missionTypeID',
            'complexity' => 'nullable|in:simple,medium,complex',
            'estimated_end_date' => 'nullable|date',
            'departure_location' => 'required|string|max:255',
            'destination' => 'required|string|max:255',
            'mission_date' => 'required|date',
            'mission_time' => 'required',
            'missionObjectiveID' => 'required|exists:mission_objectives,missionObjectiveID',
            'description' => 'nullable|string',
        ]);

        // 👇 Add this line exactly like this
        $validated['created_by'] = 1;

        $mission = Mission::create($validated);

        return response()->json([
            'message' => 'Mission created successfully',
            'mission' => $mission
        ], 201);
    }
}
