<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\Mission;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class MissionController extends Controller
{
    public function index()
    {
        return response()->json(Mission::with(['vehicle', 'driver'])->latest()->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'vehicleID' => 'required|exists:vehicles,vehicleID',
            'driverID' => 'required|exists:drivers,driverID',
            'missionTypeID' => 'required',
            // Add all other validation
        ]);
        $mission = Mission::create($validated);
        return response()->json($mission, 201);
    }

    public function show($id)
    {
        return Mission::with(['vehicle', 'driver'])->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $mission = Mission::findOrFail($id);
        $mission->update($request->all());
        return response()->json($mission);
    }

    public function destroy($id)
    {
        Mission::destroy($id);
        return response()->json(['message' => 'Deleted successfully']);
    }
}
