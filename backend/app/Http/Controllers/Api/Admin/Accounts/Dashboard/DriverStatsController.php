<?php

namespace App\Http\Controllers\Api\Admin\Accounts\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Driver;
use Illuminate\Http\JsonResponse;

class DriverStatsController extends Controller
{
    public function index(): JsonResponse
    {
        $total = Driver::count();
        $available = Driver::where('status', 'Available')->count();
        $onMission = Driver::where('status', 'On Mission')->count();
        $resting = Driver::where('status', 'Resting')->count();
        $unavailable = Driver::where('status', 'Unavailable')->count();

        return response()->json([
            'total' => $total,
            'available' => $available,
            'on_mission' => $onMission,
            'resting' => $resting,
            'unavailable' => $unavailable,
        ]);
    }
}