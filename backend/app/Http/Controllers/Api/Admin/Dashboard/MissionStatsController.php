<?php

namespace App\Http\Controllers\Api\Admin\Dashboard;

use App\Models\Mission;

use App\Http\Controllers\Controller;

class MissionStatsController extends Controller
{
    public static function getStats(): array
    {
        return [
            'total' => Mission::count(),
            'ongoing' => Mission::where('status', 'in_progress')->count(),
            'scheduled' => Mission::where('status', 'programmed')->count(),
            'cancelled' => Mission::where('status', 'cancelled')->count(),
        ];
    }
}
