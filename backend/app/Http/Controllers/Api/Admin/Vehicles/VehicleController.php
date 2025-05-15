<?php

namespace App\Http\Controllers\Api\Admin\Vehicles;

use App\Models\Vehicle;
use App\Models\VehicleMaintenance;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\StoreVehicleRequest;
use Illuminate\Support\Facades\DB;
use App\Models\Breakdown;

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

            $lastMissionWithDriver = $vehicle->missions()
                ->whereNotNull('driverID')
                ->with('driver.user')
                ->latest('created_at')
                ->first();

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
                'driver' => $lastMissionWithDriver && $lastMissionWithDriver->driver && $lastMissionWithDriver->driver->user ? [
                    'name' => $lastMissionWithDriver->driver->user->first_name . ' ' . $lastMissionWithDriver->driver->user->last_name,
                    'phone' => $lastMissionWithDriver->driver->user->phone_number,
                ] : null,

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

    public function store(StoreVehicleRequest $request)
    {
        $data = $request->validated();

        DB::beginTransaction();

        try {
            // 1. Store the vehicle
            $vehicle = Vehicle::create([
                'vehicleTypeID' => $data['vehicleTypeID'],
                'brandID' => $data['brandID'],
                'modelID' => $data['modelID'],
                'registration_number' => $data['registration_number'],
                'colorID' => $data['colorID'],
                'mileage' => $data['mileage'],
                'engineTypeID' => $data['engineTypeID'],
                'fuelTypeID' => $data['fuelTypeID'],
                'serviceID' => $data['serviceID'],
                'technical_control_date' => $data['technical_control_date'],
                'insurance_date' => $data['insurance_date'],
                'status' => $data['status'],
            ]);

            // 2. Store vehicle maintenance entries
            foreach ($data['maintenances'] as $item) {
                VehicleMaintenance::create([
                    'vehicleID' => $vehicle->vehicleID,
                    'maintenanceTypeID' => $item['maintenanceTypeID'],
                    'kilometrage' => $item['kilometrage'] ?? null,
                    'date' => $item['date'] ?? null,
                    'interval_km' => $item['interval_km'] ?? null,
                ]);
            }

            // 3. Store breakdowns
            foreach ($data['mechanical_breakdowns'] ?? [] as $bd) {
                $vehicle->breakdowns()->create([
                    'breakdownTypeID' => $bd['breakdownTypeID'] ?? 1,
                    'date' => $bd['date'],
                    'description' => $bd['description'] ?? null,
                ]);
            }

            try {
                foreach ($data['electrical_breakdowns'] ?? [] as $bd) {
                    $vehicle->breakdowns()->create([
                        'breakdownTypeID' => $bd['breakdownTypeID'] ?? 2,
                        'date' => $bd['date'],
                        'description' => $bd['description'] ?? null,
                    ]);
                }
            } catch (\Exception $e) {
                // Handle the exception, log it, or return an error response
            }

            DB::commit();

            return response()->json(['message' => '✅ Véhicule enregistré avec succès'], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => '❌ Erreur serveur: ' . $e->getMessage()], 500);
        }
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

        $allMissions = $vehicle->missions()
            ->orderByDesc('mission_date')
            ->get();

        $missionCount = $vehicle->missions->count();
        $mileage = $vehicle->mileage ?? 0;
        $fuelLevel = $vehicle->fuel_level ?? 0;

        $base = 8000;
        $mileageFactor = floor($mileage / 1000) * 100;
        $missionFactor = $missionCount * 300;
        $fuelBonus = intval(($fuelLevel / 100) * 2000);

        $maxMonthlyConsumption = max(8000, min($base + $mileageFactor + $missionFactor - $fuelBonus, 30000));

        $average = $vehicle->average_consumption ?? 0;
        $current = $vehicle->current_consumption ?? 0;


        $brand = $vehicle->brand?->name;
        $category = $vehicle->type?->name;
        $model = $vehicle->model;

        $imagePath = "vehicles/imges/{$brand}/{$category}/{$model}.png";
        $imageFullPath = storage_path("app/public/" . $imagePath);
        $imageExists = file_exists($imageFullPath);

        return response()->json([
            'id' => $vehicle->vehicleID,
            'registration' => $vehicle->registration_number,
            'status' => $vehicle->status,

            'brand' => [
                'name' => $brand,
                'logo' => $vehicle->brand?->logo,
            ],

            'model' => $vehicle->model ? [
                'name' => $vehicle->model->model_name,
                'photo' => $vehicle->model->photo ? asset('storage/' . $vehicle->model->photo) : null,
            ] : null,

            'consumption' => [
                'average' => $average,
                'current' => $current,
                'average_percent' => $maxMonthlyConsumption > 0 ? round(($average / $maxMonthlyConsumption) * 100) : 0,
                'current_percent' => $maxMonthlyConsumption > 0 ? round(($current / $maxMonthlyConsumption) * 100) : 0,
                'max_estimated' => $maxMonthlyConsumption,
            ],

            'fuel_level' => $fuelLevel,

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

    public function breakdowns()
    {
        return $this->hasMany(Breakdown::class, 'vehicleID');
    }
}
