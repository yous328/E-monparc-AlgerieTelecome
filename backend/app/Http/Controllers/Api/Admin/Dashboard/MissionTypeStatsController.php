<?php

namespace App\Http\Controllers\Api\Admin\Dashboard;

use App\Models\Mission;
use App\Http\Controllers\Controller;

class MissionTypeStatsController extends Controller
{
    public static function getStats(): array
    {
        return [
            'total' => Mission::count(),

            'internal' => Mission::whereHas('missionType', function ($query) {
                $query->where('category', 'Internal');
            })->count(),

            'external' => Mission::whereHas('missionType', function ($query) {
                $query->where('category', 'External');
            })->count(),

            'heavy' => Mission::whereHas('missionType', function ($query) {
                $query->where('complexity', 'Heavy');
            })->count(),

            'light' => Mission::whereHas('missionType', function ($query) {
                $query->where('complexity', 'Light');
            })->count(),
        ];
    }
}
