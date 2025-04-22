<?php

namespace App\Http\Controllers\Api\Admin\Dashboard;

use App\Models\Mission;
use App\Http\Controllers\Controller;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;


class MonthlyStatsController extends Controller
{
    public static function getStats(): Collection
    {
        return Mission::select(
            DB::raw("MONTH(mission_date) as month_number"),
            DB::raw("DATE_FORMAT(mission_date, '%b') as month"),
            DB::raw("COUNT(*) as planned"),
            DB::raw("SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed")
        )
            ->groupByRaw("MONTH(mission_date), DATE_FORMAT(mission_date, '%b')")
            ->orderByRaw("MONTH(mission_date)")
            ->get()
            ->map(function ($item) {
                return [
                    'month' => $item->month,
                    'planned' => $item->planned,
                    'completed' => $item->completed
                ];
            });
    }
}
