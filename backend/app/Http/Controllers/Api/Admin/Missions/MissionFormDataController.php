<?php

namespace App\Http\Controllers\Api\Admin\Missions;

use App\Http\Controllers\Controller;
use App\Models\Vehicle;
use App\Models\Driver;
use App\Models\Employee;
use App\Models\MissionType;
use App\Models\MissionObjective;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class MissionFormDataController extends Controller
{
    public function index(): JsonResponse
    {
        // Get available vehicles with their model and brand information
        $vehicles = Vehicle::where('status', 'Available')
            ->with([
                'model:modelID,model_name,brandID',
                'brand:brandID,name',
                'type:vehicleTypeID,name'
            ])
            ->get();
        Log::info('Available vehicles count: ' . $vehicles->count());
        
        // Debug first vehicle's data to check structure
        if ($vehicles->count() > 0) {
            Log::debug('First vehicle data example:', [
                'vehicle' => $vehicles->first()->toArray(),
            ]);
        }
        
        // Get available drivers with specific user fields
        $drivers = Driver::where('status', 'Available')
            ->with(['user:id,first_name,last_name,email,phone_number'])
            ->get();
        Log::info('Available drivers count: ' . $drivers->count());
        
        // Debug first driver's data to check structure
        if ($drivers->count() > 0) {
            Log::debug('First driver data example:', [
                'driver' => $drivers->first()->toArray(),
            ]);
        }
        
        // Get available employees with specific user fields
        $employees = Employee::where('status', 'Available')
            ->with(['user:id,first_name,last_name,email,phone_number'])
            ->get();
        Log::info('Available employees count: ' . $employees->count());
        
        // Get mission types and objectives
        $missionTypes = MissionType::all();
        $objectives = MissionObjective::all();
        
        return response()->json([
            'vehicles' => $vehicles,
            'drivers' => $drivers,
            'employees' => $employees,
            'missionTypes' => $missionTypes,
            'objectives' => $objectives,
        ]);
    }
}
