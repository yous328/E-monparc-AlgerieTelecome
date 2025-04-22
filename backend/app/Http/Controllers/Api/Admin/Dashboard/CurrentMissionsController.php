<?php

namespace App\Http\Controllers\Api\Admin\Dashboard;

use App\Models\Mission;
use App\Http\Controllers\Controller;
use Illuminate\Support\Collection;

class CurrentMissionsController extends Controller
{
    public static function getStats(): Collection
    {
        return Mission::where('status', 'in_progress')
            ->with(['vehicle', 'driver.user'])
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($mission) {
                return [
                    'vehicle' => $mission->vehicle->registration_number ?? 'N/A',
                    'driver' => $mission->driver->user->name ?? 'N/A',
                    'type' => $mission->type->name ?? 'Transport',
                    'departure' => $mission->departure_location,
                    'arrival' => $mission->destination,
                    'localisation' => 'VOL-' . rand(100000, 999999),
                    'progress' => rand(60, 90),
                ];
            });
    }
}