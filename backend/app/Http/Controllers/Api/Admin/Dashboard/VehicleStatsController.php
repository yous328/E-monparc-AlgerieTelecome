<?php

namespace App\Http\Controllers\Api\Admin\Dashboard;

use App\Models\Vehicle;
use App\Http\Controllers\Controller;

class VehicleStatsController extends Controller
{
    public static function getStats(): array
    {
        return [
            'total' => Vehicle::count(),
            'Available' => Vehicle::where('status', 'Available')->count(),
            'occupied' => Vehicle::where('status', 'On Mission')->count(),
            'in_breakdown' => Vehicle::where('status', 'In Breakdown')->count(),
        ];
    }
}
