<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\Admin\Dashboard\DashboardController;

use App\Http\Controllers\Api\Admin\Dashboard\VehicleStatsController;
use App\Http\Controllers\Api\Admin\Dashboard\MissionStatsController;
use App\Http\Controllers\Api\Admin\Dashboard\DriverStatsController;
use App\Http\Controllers\Api\Admin\Dashboard\CurrentMissionsController;
use App\Http\Controllers\Api\Admin\Dashboard\CompletedMissionsController;
use App\Http\Controllers\Api\Admin\Dashboard\MissionTypeStatsController;
use App\Http\Controllers\Api\Admin\Dashboard\MonthlyStatsController;



Route::prefix('admin/dashboard')
    ->middleware(['auth:sanctum', 'role:Admin'])
    ->group(function () {
        Route::get('/', [DashboardController::class, 'index']);
        Route::prefix('stats')->group(function () {
            Route::get('vehicles', [VehicleStatsController::class, 'getStats']);
            Route::get('drivers', [DriverStatsController::class, 'getStats']);
            Route::get('missions', [MissionStatsController::class, 'getStats']);
            Route::get('current/missions', [CurrentMissionsController::class, 'getStats']);
            Route::get('type/missions', [MissionTypeStatsController::class, 'getStats']);
            Route::get('monthly', [MonthlyStatsController::class, 'getStats']);
        });
    });
