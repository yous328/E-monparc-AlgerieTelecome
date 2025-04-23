<?php

namespace App\Http\Controllers\Api\Admin\Missions;

use App\Http\Controllers\Controller;
use App\Models\Mission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Services\Missions\MissionSchedulerService;

class MissionController extends Controller
{
    protected MissionSchedulerService $scheduler;

    public function __construct(MissionSchedulerService $scheduler)
    {
        $this->scheduler = $scheduler;
    }

    // Get all missions
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

    // Show one mission
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

    // Store new mission using the scheduler
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
            'mission_time' => 'required|date_format:H:i',
            'missionObjectiveID' => 'required|exists:mission_objectives,missionObjectiveID',
            'description' => 'nullable|string',
        ]);

        // You can use Auth::id() or hardcoded fallback (for testing)
        $validated['created_by'] = /*Auth::id() ??*/ 1;

        // Use the scheduler service to create mission + handle planning/availability
        $mission = $this->scheduler->createScheduledMission($validated);

        return response()->json([
            'message' => 'Mission created and scheduled successfully ✅',
            'mission' => $mission
        ], 201);
    }
}
