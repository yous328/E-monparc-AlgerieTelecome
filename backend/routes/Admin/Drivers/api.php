<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\Admin\Drivers\DriverController;
use App\Http\Controllers\Api\Admin\Drivers\DriverListController;
use App\Http\Controllers\Api\Admin\Drivers\Dashboard\DriverStatsController;
use App\Http\Controllers\Api\Admin\Drivers\Filters\DriverAvailabilityFilterController;
use App\Http\Controllers\Api\Admin\Drivers\Filters\DriverLicenseTypeFilterController;


Route::middleware(['auth:sanctum', 'role:Admin'])
    ->prefix('admin/drivers')
    ->group(function () {
        Route::get('/', [DriverController::class, 'index']);
        Route::post('/', [DriverController::class, 'store']);
        Route::get('/list', [DriverListController::class, 'index']);
        Route::get('/filter/availability', [DriverAvailabilityFilterController::class, 'index']);
        Route::get('/filter/license-type', [DriverLicenseTypeFilterController::class, 'index']);
        Route::get('/stats', [DriverStatsController::class, 'index']);
        Route::get('/{id}', [DriverController::class, 'show']);
        Route::put('/{id}', [DriverController::class, 'update']);
        Route::delete('/{id}', [DriverController::class, 'destroy']);
    });