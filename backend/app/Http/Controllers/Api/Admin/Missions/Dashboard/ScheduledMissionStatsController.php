<?php

namespace App\Http\Controllers\Api\Admin\Missions\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Mission;
use Illuminate\Http\JsonResponse;

class ScheduledMissionStatsController extends Controller
{
    public function count(): JsonResponse
    {
        $count = Mission::where('status', 'pending')->count();
        return response()->json(['scheduled' => $count]);
    }
}