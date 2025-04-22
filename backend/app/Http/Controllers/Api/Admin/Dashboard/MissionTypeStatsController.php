<?php

namespace App\Http\Controllers\Api\Admin\Dashboard;

use App\Models\MissionType;
use App\Http\Controllers\Controller;

class MissionTypeStatsController extends Controller
{
    public static function getStats(): array
    {
        return [
            'internal' => MissionType::where('category', 'Internal')->count(),
            'external' => MissionType::where('category', 'External')->count(),
            'heavy' => MissionType::where('name', 'Heavy')->count(),
            'light' => MissionType::where('name', 'Light')->count(),
        ];
    }
}