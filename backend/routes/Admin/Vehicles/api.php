<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\Admin\Vehicles\VehicleController;
use App\Http\Controllers\Api\Admin\Vehicles\VehicleFormDataController;
use App\Http\Controllers\Api\Admin\Vehicles\VehicleMaintenanceController;
use App\Http\Controllers\Api\Admin\Vehicles\VehicleBreakdownController;


Route::middleware(['auth:sanctum', 'role:Admin'])
    ->prefix('admin/vehicles')
    ->group(function () {
        Route::get('/', [VehicleController::class, 'index']);
        Route::post('/add', [VehicleController::class, 'store']);
        Route::get('/form/data', [VehicleFormDataController::class, 'index']);
        Route::get('/{id}', [VehicleController::class, 'show']);
        Route::get('/{id}/maintenance', [VehicleMaintenanceController::class, 'show']);
        Route::post('/{id}/maintenance', [VehicleMaintenanceController::class, 'store']);
        Route::get('/{id}/breakdowns', [VehicleBreakdownController::class, 'index']);
        Route::post('/{id}/breakdowns', [VehicleBreakdownController::class, 'store']);
    });
