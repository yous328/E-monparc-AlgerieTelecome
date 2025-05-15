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
        $brands = VehicleBrand::with('models')->get()->map(function ($brand) {
            return [
                'brandID' => $brand->brandID,
                'name' => $brand->name,
                'models' => $brand->models->map(function ($model) {
                    return [
                        'modelID' => $model->modelID,
                        'model_name' => $model->model_name,
                    ];
                }),
            ];
        });

        return response()->json([
            'brands' => $brands,
            'types' => VehicleType::all(),
            'engines' => EngineType::all(),
            'fuels' => FuelType::all(),
            'colors' => Color::all(),
            'services' => Service::all(),
        ]);
    }
}
