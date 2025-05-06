<?php

namespace App\Http\Controllers\Api\Admin\Vehicles;

use App\Models\Vehicle;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class VehicleController extends Controller
{
    public function index(Request $request)
    {
        $query = Vehicle::with([
            'brand',
            'type',
            'engine',
            'fuelType',
            'color',
            'service',
            'insurance',
            'technicalControl',
            'technicalStatus',
            'usageHistory',
            'missions.driver'
        ]);

        // Filter by Vehicle Type
        if ($request->has('type') && $request->type !== '') {
            $query->whereHas('type', function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->type . '%');
            });
        }

        // Filter by Status (convert UI status labels to DB values)
        if ($request->has('status') && $request->status !== '') {
            $statusMap = [
                'Disponible' => 'Available',
                'Occupé' => 'On Mission',
                'En Panne' => 'In Breakdown'
            ];
            $query->where('status', $statusMap[$request->status] ?? $request->status);
        }

        // Filter by Driver Assignment
        if ($request->has('assignment') && $request->assignment !== '') {
            $query->whereHas('missions', function ($q) use ($request) {
                if ($request->assignment === 'affecté') {
                    $q->whereNotNull('driverID');
                } elseif ($request->assignment === 'non_affecté') {
                    $q->whereNull('driverID');
                }
            });
        }

        $vehicles = $query->get();

        // Map each vehicle into frontend-compatible structure
        $mapped = $vehicles->map(function ($vehicle) {
            return [
                'id' => $vehicle->vehicleID,
                'brand' => $vehicle->brand->name ?? '',
                'registration_number' => $vehicle->registration_number,
                'image_url' => $vehicle->photo ? asset('storage/' . $vehicle->photo) : null,
                'status' => match ($vehicle->status) {
                    'Available' => 'Disponible',
                    'On Mission' => 'Occupé',
                    'In Breakdown' => 'En Panne',
                    default => 'Unavailable'
                },
                'kilometrage' => $vehicle->mileage,
                'fuel' => (float) $vehicle->fuel_level,
                'consumption_avg' => (float) $vehicle->average_consumption,
                'consumption_current' => (float) $vehicle->current_consumption,
                'price' => (float) $vehicle->cost_per_km,
                'leasing_price' => (float) $vehicle->daily_cost,
                'driver_name' => optional($vehicle->missions()->latest()->first()?->driver)->full_name ?? 'Unassigned',
                'technical_check_expiry' => optional($vehicle->technicalControl)->expiry_date,
                'insurance_type' => optional($vehicle->insurance)->type,
                'insurance_expiry' => optional($vehicle->insurance)->expiry_date,

                'usage_history' => $vehicle->usageHistory->map(function ($history) {
                    return [
                        'driver_name' => $history->driver_name,
                        'phone' => $history->driver_phone,
                        'date' => $history->usage_date,
                        'from' => explode(' → ', $history->route)[0] ?? '',
                        'to' => explode(' → ', $history->route)[1] ?? '',
                        'distance_km' => (float) $history->distance_km,
                        'average_speed' => $history->average_speed . ' km/h',
                    ];
                }),

                'missions_per_month' => $vehicle->missions()
                    ->whereMonth('mission_date', Carbon::now()->month)
                    ->count(),

                'technical_status' => [
                    'vidange' => [
                        'done_at' => $vehicle->technicalStatus->vidange_km ?? 0,
                        'next_due' => ($vehicle->technicalStatus->vidange_km ?? 0) + 10000
                    ],
                    'batterie' => [
                        'done_at' => $vehicle->technicalStatus->batterie_km ?? 0,
                        'next_due' => ($vehicle->technicalStatus->batterie_km ?? 0) + 30000
                    ],
                    'bougies' => [
                        'done_at' => $vehicle->technicalStatus->bougies_km ?? 0,
                        'next_due' => ($vehicle->technicalStatus->bougies_km ?? 0) + 40000
                    ],
                    'gaz_clim' => [
                        'done_at' => $vehicle->technicalStatus->gaz_clim_km ?? 0,
                        'next_due' => ($vehicle->technicalStatus->gaz_clim_km ?? 0) + 25000
                    ],
                    'chaine' => [
                        'done_at' => $vehicle->technicalStatus->chaine_km ?? 0,
                        'next_due' => ($vehicle->technicalStatus->chaine_km ?? 0) + 90000
                    ],
                    'pneus' => [
                        'done_at' => $vehicle->technicalStatus->panneaux_km ?? 0,
                        'next_due' => ($vehicle->technicalStatus->panneaux_km ?? 0) + 40000
                    ],
                    'filtres' => [
                        'done_at' => $vehicle->technicalStatus->filtres_km ?? 0,
                        'next_due' => ($vehicle->technicalStatus->filtres_km ?? 0) + 15000
                    ],
                    'plaquettes_frein' => [
                        'done_at' => $vehicle->technicalStatus->plaquettes_frein_km ?? 0,
                        'next_due' => ($vehicle->technicalStatus->plaquettes_frein_km ?? 0) + 20000
                    ],
                ]
            ];
        });

        return response()->json($mapped);
    }



    public function store(Request $request)
    {
        $validated = $request->validate([
            'registration_number' => 'required|unique:vehicles',
            'brandID' => 'required|exists:vehicle_brands,brandID',
            'vehicleTypeID' => 'required|exists:vehicle_types,vehicleTypeID',
            'engineTypeID' => 'required|exists:engine_types,engineTypeID',
            'fuelTypeID' => 'required|exists:fuel_types,fuelTypeID',
            'colorID' => 'required|exists:colors,colorID',
            'status' => 'required|in:Available,On Mission,Under Maintenance,In Breakdown,Unavailable',
            'serviceID' => 'required|exists:services,serviceID',
            'mileage' => 'required|integer',
            'last_maintenance_date' => 'nullable|date',
            'next_available_date' => 'nullable|date',
            'photo' => 'nullable|image',
        ]);

        if ($request->hasFile('photo')) {
            $validated['photo'] = $request->file('photo')->store('vehicles', 'public');
        }

        $vehicle = Vehicle::create($validated);

        return response()->json([
            'message' => 'Vehicle created successfully.',
            'vehicle' => $vehicle
        ], 201);
    }

    public function show($id)
    {
        $vehicle = Vehicle::with([
            'brand',
            'type',
            'engine',
            'fuelType',
            'color',
            'service',
            'insurance',
            'technicalControl',
            'technicalStatus',
            'usageHistory',
            'missions'
        ])->findOrFail($id);

        return response()->json($vehicle);
    }
}
