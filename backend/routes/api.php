<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\Admin\Dashboard\DashboardController;
use App\Http\Controllers\Api\Admin\Vehicles\VehicleController;
use App\Http\Controllers\Api\Admin\Vehicles\VehicleFormDataController;
use App\Http\Controllers\Api\Admin\Vehicles\VehicleMaintenanceController;
use App\Http\Controllers\Api\Admin\Vehicles\VehicleBreakdownController;
use App\Http\Controllers\Api\Admin\Missions\MissionFormDataController;
use App\Http\Controllers\Api\Admin\Missions\MissionPlanController;
use App\Http\Controllers\Api\Admin\Missions\MissionController;
use App\Http\Controllers\Api\Admin\Missions\Dashboard\MissionDashboardStatsController;

// 🔐 Default auth route to get user (can leave as-is)
Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

// 🔒 Protected routes (for Admin dashboard) - DISABLED while testing

/*Route::middleware(['auth:sanctum', 'role:Admin'])->prefix('admin')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index']);

    Route::prefix('vehicles')->group(function () {
        Route::get('/', [VehicleController::class, 'index']);
        Route::get('/{id}', [VehicleController::class, 'show']);
        Route::post('/', [VehicleController::class, 'store']);

        Route::get('/form/data', [VehicleFormDataController::class, 'index']);

        Route::get('/{id}/maintenance', [VehicleMaintenanceController::class, 'show']);
        Route::post('/{id}/maintenance', [VehicleMaintenanceController::class, 'store']);

        Route::get('/{id}/breakdowns', [VehicleBreakdownController::class, 'index']);
        Route::post('/{id}/breakdowns', [VehicleBreakdownController::class, 'store']);
    });

    Route::middleware(['auth:sanctum', 'role:Admin'])->prefix('admin')->group(function () {
        Route::prefix('missions')->group(function () {
            Route::get('/form/data', [MissionFormDataController::class, 'index']);
            Route::get('/plans', [MissionPlanController::class, 'index']);
            Route::post('/plans', [MissionPlanController::class, 'store']);
            Route::get('/', [MissionController::class, 'index']);
            Route::post('/', [MissionController::class, 'store']);
            Route::get('/{id}', [MissionController::class, 'show']);
            Route::get('/stats', [MissionDashboardStatsController::class, 'index']);
        });
    });    
});*/


    Route::prefix('missions')->group(function () {
        Route::get('/form/data', [MissionFormDataController::class, 'index']);
        Route::get('/plans', [MissionPlanController::class, 'index']);
        Route::post('/plans', [MissionPlanController::class, 'store']);
        Route::get('/stats', [MissionDashboardStatsController::class, 'index']);
        Route::get('/', [MissionController::class, 'index']);
        Route::post('/', [MissionController::class, 'store']);
        Route::get('/{id}', [MissionController::class, 'show']);
        
    });



// 🔒 Protected mobile routes (e.g., for drivers) - leave for later
/*
Route::middleware(['auth:sanctum', 'role:Driver'])->prefix('mobile')->group(function () {
    // Driver-only routes go here
});
*/
