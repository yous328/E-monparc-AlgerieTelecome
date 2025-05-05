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
                    'vehicle' => $mission->vehicle->brand->name ?? 'N/A',

                    'driver' => isset($mission->driver->user)
                        ? $mission->driver->user->first_name . ' ' . $mission->driver->user->last_name
                        : 'N/A',

                    'type' => isset($mission->missionType)
                        ? $mission->missionType->category . '/' . $mission->missionType->complexity
                        : 'N/A',

                    'departure' => $mission->departure_location,

                    'arrival' => $mission->destination,
                    
                    'localisation' => 'VOL-' . rand(100000, 999999),
                    'progress' => rand(60, 90),
                ];
            });
    }
}
