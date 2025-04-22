<?php

namespace App\Http\Controllers\Api\Admin\Vehicles;

use App\Models\ProblemReport;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class VehicleBreakdownController extends Controller
{
    public function index($id)
    {
        $breakdowns = ProblemReport::with(['type', 'reporter'])
            ->where('vehicleID', $id)
            ->orderByDesc('created_at')
            ->get();

        return response()->json($breakdowns);
    }

    public function store(Request $request, $id)
    {
        $validated = $request->validate([
            'reported_by' => 'required|exists:users,id',
            'problem_type_id' => 'nullable|exists:problem_types,problemTypeID',
            'description' => 'required|string',
            'status' => 'nullable|in:pending,in_progress,resolved',
            'image_path' => 'nullable|string',
        ]);

        $report = ProblemReport::create([
            'vehicleID' => $id,
            'reported_by' => $validated['reported_by'],
            'problem_type_id' => $validated['problem_type_id'] ?? null,
            'description' => $validated['description'],
            'status' => $validated['status'] ?? 'pending',
            'image_path' => $validated['image_path'] ?? null,
        ]);

        return response()->json($report, 201);
    }
}
