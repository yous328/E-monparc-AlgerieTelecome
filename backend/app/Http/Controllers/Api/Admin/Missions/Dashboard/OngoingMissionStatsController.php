<?php

namespace App\Http\Controllers\Api\Admin\Missions\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Mission;
use Illuminate\Http\JsonResponse;

class OngoingMissionStatsController extends Controller
{
    public function count(): JsonResponse
    {
        $count = Mission::where('status', 'in_progress')->count();
        return response()->json(['in_progress' => $count]);
    }
}