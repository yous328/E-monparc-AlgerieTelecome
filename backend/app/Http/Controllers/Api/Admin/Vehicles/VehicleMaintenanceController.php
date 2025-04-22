<?php

namespace App\Http\Controllers\Api\Admin\Vehicles;

use App\Models\VehicleMaintenance;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class VehicleMaintenanceController extends Controller
{
    public function show($id)
    {
        return VehicleMaintenance::where('vehicleID', $id)->first();
    }

    public function store(Request $request, $id)
    {
        $validated = $request->validate([
            'oil_km' => 'nullable|integer',
            'oil_date' => 'nullable|date',
            'oil_interval' => 'nullable|integer',
            'battery_km' => 'nullable|integer',
            'battery_date' => 'nullable|date',
            'battery_interval' => 'nullable|integer',
            'spark_plugs_km' => 'nullable|integer',
            'spark_plugs_date' => 'nullable|date',
            'spark_plugs_interval' => 'nullable|integer',
            'tires_km' => 'nullable|integer',
            'tires_date' => 'nullable|date',
            'tires_interval' => 'nullable|integer',
        ]);

        return VehicleMaintenance::updateOrCreate(
            ['vehicleID' => $id],
            $validated + ['vehicleID' => $id]
        );
    }
}
