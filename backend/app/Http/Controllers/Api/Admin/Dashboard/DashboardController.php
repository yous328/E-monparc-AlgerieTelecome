<?php

namespace App\Http\Controllers\Api\Admin\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Api\Admin\Dashboard\VehicleStatsController;
use App\Http\Controllers\Api\Admin\Dashboard\DriverStatsController;
use App\Http\Controllers\Api\Admin\Dashboard\MissionStatsController;
use App\Http\Controllers\Api\Admin\Dashboard\MissionTypeStatsController;
use App\Http\Controllers\Api\Admin\Dashboard\MonthlyStatsController;
use App\Http\Controllers\Api\Admin\Dashboard\CurrentMissionsController;

class DashboardController extends Controller
{
    public function index()
    {
        return response()->json([
            'vehicles' => VehicleStatsController::getStats(),
            'drivers' => DriverStatsController::getStats(),
            'missions' => MissionStatsController::getStats(),
            'mission_type_stats' => MissionTypeStatsController::getStats(),
            'monthly_mission_stats' => MonthlyStatsController::getStats(),
            'current_missions' => CurrentMissionsController::getStats(),
        ]);
    }
}