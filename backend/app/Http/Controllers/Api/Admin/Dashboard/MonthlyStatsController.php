<?php

namespace App\Http\Controllers\Api\Admin\Dashboard;

use App\Models\Mission;
use App\Http\Controllers\Controller;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;


class MonthlyStatsController extends Controller
{
    public static function getStats(): array
    {
        $months = collect([
            ['month_number' => 1,  'month' => 'Jan'],
            ['month_number' => 2,  'month' => 'Feb'],
            ['month_number' => 3,  'month' => 'Mar'],
            ['month_number' => 4,  'month' => 'Apr'],
            ['month_number' => 5,  'month' => 'May'],
            ['month_number' => 6,  'month' => 'Jun'],
            ['month_number' => 7,  'month' => 'Jul'],
            ['month_number' => 8,  'month' => 'Aug'],
            ['month_number' => 9,  'month' => 'Sep'],
            ['month_number' => 10, 'month' => 'Oct'],
            ['month_number' => 11, 'month' => 'Nov'],
            ['month_number' => 12, 'month' => 'Dec'],
        ]);

        // Get actual mission data grouped by month
        $missionStats = Mission::select(
            DB::raw("MONTH(mission_date) as month_number"),
            DB::raw("COUNT(*) as planned"),
            DB::raw("SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed")
        )
            ->groupBy(DB::raw("MONTH(mission_date)"))
            ->get()
            ->keyBy('month_number');

        // Merge with full month list
        return $months->map(function ($month) use ($missionStats) {
            $stats = $missionStats->get($month['month_number']);

            return [
                'month'     => $month['month'],
                'planned'   => $stats->planned ?? 0,
                'completed' => $stats->completed ?? 0,
            ];
        })->toArray();
    }
}
