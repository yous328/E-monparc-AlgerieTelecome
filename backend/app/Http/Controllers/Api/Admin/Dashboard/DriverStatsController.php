<?php

namespace App\Http\Controllers\Api\Admin\Dashboard;

use App\Models\Driver;

use App\Http\Controllers\Controller;

class DriverStatsController extends Controller
{
    public static function getStats(): array
    {
        return [
            'total' => Driver::count(),
            'available' => Driver::where('status', 'Available')->count(),
            'on_mission' => Driver::where('status', 'OnMission')->count(),
            'unavailable' => Driver::where('status', 'Unavailable')->count(),
        ];
    }
}