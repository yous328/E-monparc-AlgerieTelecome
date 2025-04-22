<?php

namespace App\Http\Controllers\Api\Admin\Missions\Dashboard;

use App\Http\Controllers\Api\Admin\Missions\Dashboard\OngoingMissionStatsController;
use App\Http\Controllers\Api\Admin\Missions\Dashboard\ScheduledMissionStatsController;
use App\Http\Controllers\Api\Admin\Missions\Dashboard\CancelledMissionStatsController;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;


class MissionDashboardStatsController extends Controller
{
    protected $ongoing;
    protected $scheduled;
    protected $cancelled;

    public function __construct(
        OngoingMissionStatsController $ongoing,
        ScheduledMissionStatsController $scheduled,
        CancelledMissionStatsController $cancelled
    ) {
        $this->ongoing = $ongoing;
        $this->scheduled = $scheduled;
        $this->cancelled = $cancelled;
    }

    public function index(): JsonResponse
    {
        $inProgress = $this->ongoing->count()->getData(true);
        $scheduled = $this->scheduled->count()->getData(true);
        $cancelled = $this->cancelled->count()->getData(true);

        return response()->json([
            'in_progress' => $inProgress['in_progress'],
            'scheduled' => $scheduled['scheduled'],
            'cancelled' => $cancelled['cancelled'],
        ]);
    }
}
