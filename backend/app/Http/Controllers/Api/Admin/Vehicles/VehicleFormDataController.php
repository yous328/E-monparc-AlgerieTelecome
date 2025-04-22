<?php

namespace App\Http\Controllers\Api\Admin\Vehicles;

use App\Models\VehicleBrand;
use App\Models\VehicleType;
use App\Models\EngineType;
use App\Models\FuelType;
use App\Models\Color;
use App\Models\Service;
use App\Http\Controllers\Controller;

class VehicleFormDataController extends Controller
{
    public function index()
    {
        return response()->json([
            'brands' => VehicleBrand::all(),
            'types' => VehicleType::all(),
            'engines' => EngineType::all(),
            'fuels' => FuelType::all(),
            'colors' => Color::all(),
            'services' => Service::all(),
        ]);
    }
}