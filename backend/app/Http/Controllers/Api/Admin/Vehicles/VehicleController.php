<?php

namespace App\Http\Controllers\Api\Admin\Vehicles;

use App\Models\Vehicle;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class VehicleController extends Controller
{
    public function index(Request $request)
    {
        return Vehicle::with(['brand', 'type', 'engine', 'fuelType', 'color', 'service'])->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'registration_number' => 'required|unique:vehicles',
            'brandID' => 'required|exists:vehicle_brands,brandID',
            'vehicleTypeID' => 'required|exists:vehicle_types,vehicleTypeID',
            'engineTypeID' => 'required|exists:engine_types,engineTypeID',
            'fuelTypeID' => 'required|exists:fuel_types,fuelTypeID',
            'colorID' => 'required|exists:colors,colorID',
            'status' => 'required|in:Available,On Mission,Under Maintenance,In Breakdown,Unavailable',
            'serviceID' => 'required|exists:services,serviceID',
            'mileage' => 'required|integer',
            'last_maintenance_date' => 'nullable|date',
            'next_available_date' => 'nullable|date',
            'photo' => 'nullable|image',
        ]);

        if ($request->hasFile('photo')) {
            $validated['photo'] = $request->file('photo')->store('vehicles', 'public');
        }

        $vehicle = Vehicle::create($validated);

        return response()->json([
            'message' => 'Vehicle created successfully.',
            'vehicle' => $vehicle
        ], 201);
    }

    public function show($id)
    {
        return Vehicle::with(['brand', 'type', 'engine', 'fuelType', 'color', 'service', 'maintenance'])->findOrFail($id);
    }
}
