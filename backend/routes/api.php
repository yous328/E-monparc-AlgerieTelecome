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

use App\Http\Controllers\Api\Admin\Accounts\DriverController;
use App\Http\Controllers\Api\Admin\Accounts\DriverListController;
use App\Http\Controllers\Api\Admin\Accounts\Dashboard\DriverStatsController;
use App\Http\Controllers\Api\Admin\Accounts\Filters\DriverAvailabilityFilterController;
use App\Http\Controllers\Api\Admin\Accounts\Filters\DriverLicenseTypeFilterController;

use App\Http\Controllers\Api\Admin\Employees\EmployeeController;



// 🔐 Default user route
Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

// 🔒 Admin Panel Routes
Route::middleware(['auth:sanctum', 'role:Admin'])->prefix('admin')->group(function () {

    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index']);

    // Vehicle Management
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

    // Mission Management
    Route::prefix('missions')->group(function () {
        Route::get('/form/data', [MissionFormDataController::class, 'index']);
        Route::get('/plans', [MissionPlanController::class, 'index']);
        Route::post('/plans', [MissionPlanController::class, 'store']);
        Route::get('/stats', [MissionDashboardStatsController::class, 'index']);
        Route::get('/', [MissionController::class, 'index']);
        Route::post('/', [MissionController::class, 'store']);
        Route::get('/{id}', [MissionController::class, 'show']);
    });

    // Driver Management
    Route::prefix('drivers')->group(function () {
        // Full CRUD
        Route::get('/', [DriverController::class, 'index']);         
        Route::post('/', [DriverController::class, 'store']);        
        
        // List table - MOVED ABOVE DYNAMIC ROUTES
        Route::get('/list', [DriverListController::class, 'index']);
    
        // Filtering
        Route::get('/filter/availability', [DriverAvailabilityFilterController::class, 'index']);
        Route::get('/filter/license-type', [DriverLicenseTypeFilterController::class, 'index']);
    
        // Dashboard stats
        Route::get('/stats', [DriverStatsController::class, 'index']);
    
        // Dynamic CRUD routes - PLACED AFTER SPECIFIC ROUTES
        Route::get('/{id}', [DriverController::class, 'show']);      
        Route::put('/{id}', [DriverController::class, 'update']);    
        Route::delete('/{id}', [DriverController::class, 'destroy']); 
    });

    // Employee Management
    Route::prefix('employees')->group(function () {
        Route::get('/', [EmployeeController::class, 'index']);
        Route::post('/', [EmployeeController::class, 'store']);      
        Route::get('/{id}', [EmployeeController::class, 'show']);    
        Route::put('/{id}', [EmployeeController::class, 'update']);  
        Route::delete('/{id}', [EmployeeController::class, 'destroy']); 
    });
});


// 📱 Driver mobile routes (for later)
/*
Route::middleware(['auth:sanctum', 'role:Driver'])->prefix('mobile')->group(function () {
    // TODO: Add driver app features
});
*/