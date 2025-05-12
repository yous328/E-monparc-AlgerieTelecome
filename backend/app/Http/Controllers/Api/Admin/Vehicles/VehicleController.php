<?php

namespace App\Http\Controllers\Api\Admin\Vehicles;

use App\Models\Vehicle;
use App\Models\Mission;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
            'missions.driver'
        ]);

        if ($request->filled('type')) {
            $query->whereHas('type', function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->type . '%');
            });
        }

        if ($request->filled('status')) {
            $statusMap = [
                'Disponible' => 'Available',
                'Occupé' => 'OnMission',
                'En Panne' => 'InBreakdown'
            ];
            $dbStatus = $statusMap[$request->status] ?? $request->status;
            $query->where('status', $dbStatus);
        }

        if ($request->filled('assignment')) {
            if ($request->assignment === 'affecté') {
                $query->whereHas(
                    'missions',
                    fn($q) =>
                    $q->where('status', 'in_progress')
                        ->whereHas('driver', fn($dq) => $dq->where('status', 'OnMission'))
                );
            } elseif ($request->assignment === 'non_affecté') {
                $query->where(function ($query) {
                    $query->whereDoesntHave(
                        'missions',
                        fn($q) =>
                        $q->where('status', 'in_progress')
                            ->whereHas('driver', fn($dq) => $dq->where('status', 'Resting'))
                    );
                });
            }
        }

        $vehicles = $query->paginate(8);

        $mapped = $vehicles->getCollection()->map(function ($vehicle) {
            $latestMission = $vehicle->missions->sortByDesc('created_at')->first();
            $driverName = $latestMission?->driver?->full_name ?? 'Unassigned';

            return [
                'id' => $vehicle->vehicleID,
                'brand' => $vehicle->brand->name ?? '',
                'registration_number' => $vehicle->registration_number,
                'brand_logo' => $vehicle->brand?->logo
                    ? asset('storage/' . ltrim($vehicle->brand->logo, '/'))
                    : asset('storage/vehicles/brandsImg/Volkswagen.png'),

                'status' => match ($vehicle->status) {
                    'Available' => 'Disponible',
                    'OnMission' => 'Occupé',
                    'InBreakdown' => 'En Panne',
                    default => 'Indisponible'
                },
                'driver_name' => $driverName,
                'kilometrage' => $vehicle->mileage,
                'leasing_price' => (float) $vehicle->daily_cost,
                'technical_status' => [
                    'vidange' => [
                        'done_at' => $vehicle->technicalStatus->vidange_done_at ?? 0,
                        'next_due' => $vehicle->technicalStatus->vidange_next_due ?? 0,
                    ]
                ]
            ];
        });

        return response()->json([
            'data' => $mapped,
            'current_page' => $vehicles->currentPage(),
            'last_page' => $vehicles->lastPage(),
            'total' => $vehicles->total(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'registration_number' => 'required|unique:vehicles',
            'brandID' => 'required|exists:vehicle_brands,brandID',
            'modelID' => 'required|exists:vehicle_models,modelID',
            'vehicleTypeID' => 'required|exists:vehicle_types,vehicleTypeID',
            'engineTypeID' => 'required|exists:engine_types,engineTypeID',
            'fuelTypeID' => 'required|exists:fuel_types,fuelTypeID',
            'colorID' => 'required|exists:colors,colorID',
            'status' => 'required|in:Available,OnMission,UnderMaintenance,InBreakdown,Unavailable',
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
            'missions.driver',
            'usageHistory',
        ])->findOrFail($id);

        $lastMissionWithDriver = $vehicle->missions()
            ->whereNotNull('driverID')
            ->with('driver.user')
            ->latest('created_at')
            ->first();


        $allMissions = $vehicle->missions()
            ->orderByDesc('mission_date')
            ->get();

        return response()->json([
            'id' => $vehicle->vehicleID,
            'registration' => $vehicle->registration_number,
            'status' => $vehicle->status,

            'brand' => [
                'name' => $vehicle->brand?->name,
                'logo' => $vehicle->brand?->logo,
            ],

            'model' => $vehicle->model?->model_name,

            'image_url' => $vehicle->photo ? asset('storage/' . $vehicle->photo) : null,

            'driver' => $lastMissionWithDriver && $lastMissionWithDriver->driver && $lastMissionWithDriver->driver->user ? [
                'name' => $lastMissionWithDriver->driver->user->first_name . ' ' . $lastMissionWithDriver->driver->user->last_name,
                'phone' => $lastMissionWithDriver->driver->user->phone_number,
            ] : null,

            'consumption' => $vehicle->consumption ?? [
                'average' => $vehicle->average_consumption ?? 0,
                'current' => $vehicle->current_consumption ?? 0,
            ],

            'fuel_level' => $vehicle->fuel_level ?? 0,

            'insurance' => [
                'type' => $vehicle->insurance?->insurance_type ?? 'Néant',
                'expiry_date' => $vehicle->insurance?->insurance_end_date,
            ],

            'technical_control' => [
                'status' => $vehicle->technicalControl?->status ?? 'Neant',
                'expiration_date' => $vehicle->technicalControl?->expiration_date,
            ],

            'technical_status' => [
                'vidange' => [
                    'done_at' => $vehicle->technicalStatus?->vidange_done_at,
                    'next_due' => $vehicle->technicalStatus?->vidange_next_due,
                ],
                'batterie' => [
                    'done_at' => $vehicle->technicalStatus?->batterie_done_at,
                    'next_due' => $vehicle->technicalStatus?->batterie_next_due,
                ],
                'bougies' => [
                    'done_at' => $vehicle->technicalStatus?->bougies_done_at,
                    'next_due' => $vehicle->technicalStatus?->bougies_next_due,
                ],
                'gaz_clim' => [
                    'done_at' => $vehicle->technicalStatus?->gaz_clim_done_at,
                    'next_due' => $vehicle->technicalStatus?->gaz_clim_next_due,
                ],
                'chaine' => [
                    'done_at' => $vehicle->technicalStatus?->chaine_done_at,
                    'next_due' => $vehicle->technicalStatus?->chaine_next_due,
                ],
                'pneus' => [
                    'done_at' => $vehicle->technicalStatus?->pneus_done_at,
                    'next_due' => $vehicle->technicalStatus?->pneus_next_due,
                ],
                'filtres' => [
                    'done_at' => $vehicle->technicalStatus?->filtres_done_at,
                    'next_due' => $vehicle->technicalStatus?->filtres_next_due,
                ],
                'plaquettes_frein' => [
                    'done_at' => $vehicle->technicalStatus?->plaquettes_frein_done_at,
                    'next_due' => $vehicle->technicalStatus?->plaquettes_frein_next_due,
                ],
            ],

            'usage_history' => $vehicle->usageHistory->map(function ($usage) {
                $fromTo = explode('→', $usage->route);
                return [
                    'driver_name' => $usage->driver_name,
                    'phone' => $usage->driver_phone,
                    'date' => $usage->usage_date,
                    'from' => trim($fromTo[0] ?? ''),
                    'to' => trim($fromTo[1] ?? ''),
                    'distance_km' => $usage->distance_km,
                    'average_speed' => $usage->average_speed,
                ];
            }),

            'missions' => $allMissions->map(function ($mission) {
                return [
                    'id' => $mission->missionID,
                    'title' => $mission->description ?? 'Mission',
                    'date' => $mission->mission_date,
                    'status' => $mission->status,
                ];
            }),

            'monthly_kilometrage' => $vehicle->monthly_kilometrage ?? [],
            'mission_stats' => $vehicle->mission_stats ?? [],
        ]);
    }
}
