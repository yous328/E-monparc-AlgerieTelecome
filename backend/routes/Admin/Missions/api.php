<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\Admin\Missions\MissionFormDataController;
use App\Http\Controllers\Api\Admin\Missions\MissionPlanController;
use App\Http\Controllers\Api\Admin\Missions\MissionController;
use App\Http\Controllers\Api\Admin\Missions\Dashboard\MissionDashboardStatsController;


Route::middleware(['auth:sanctum', 'role:Admin'])
    ->prefix('admin/missions')
    ->group(function () {
        Route::get('/form/data', [MissionFormDataController::class, 'index']);
        Route::get('/plans', [MissionPlanController::class, 'index']);
        Route::post('/plans', [MissionPlanController::class, 'store']);
        Route::get('/stats', [MissionDashboardStatsController::class, 'index']);
        Route::get('/', [MissionController::class, 'index']);
        Route::post('/', [MissionController::class, 'store']);
        Route::get('/{id}', [MissionController::class, 'show']);
    });