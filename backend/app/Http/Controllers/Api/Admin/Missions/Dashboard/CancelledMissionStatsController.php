<?php

namespace App\Http\Controllers\Api\Admin\Missions\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Mission;
use Illuminate\Http\JsonResponse;

class CancelledMissionStatsController extends Controller
{
    public function count(): JsonResponse
    {
        $count = Mission::where('status', 'cancelled')->count();
        return response()->json(['cancelled' => $count]);
    }
}