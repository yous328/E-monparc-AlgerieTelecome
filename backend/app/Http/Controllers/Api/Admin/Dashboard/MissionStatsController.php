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
            'canceled' => Mission::where('status', 'canceled')->count(),
            'ongoing' => Mission::where('status', 'in_progress')->count(),
            'scheduled' => Mission::where('status', 'not_started_yet')->count(),
        ];
    }
}
