<?php

namespace App\Http\Controllers\Api\Admin\Drivers;

use App\Http\Controllers\Controller;
use App\Models\Driver;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class DriverListController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $perPage = $request->input('per_page', 6);

        $drivers = Driver::with(['user', 'licenseType'])
            ->paginate($perPage)
            ->through(function ($driver) {
                return [
                    'name' => $driver->user->first_name . ' ' . $driver->user->last_name,
                    'phone' => $driver->user->phone_number,
                    'email' => $driver->user->email,
                    'permit_type' => $driver->licenseType->name ?? 'N/A',
                    'status' => $driver->status,
                ];
            });

        return response()->json($drivers);
    }
}
