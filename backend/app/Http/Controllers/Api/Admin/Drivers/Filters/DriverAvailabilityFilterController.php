<?php

namespace App\Http\Controllers\Api\Admin\Drivers\Filters;

use App\Http\Controllers\Controller;
use App\Models\Driver;
use Illuminate\Http\Request;

class DriverAvailabilityFilterController extends Controller
{
    public function index(Request $request)
    {
        $status = $request->input('status');

        $drivers = Driver::with(['user', 'licenseType'])
            ->where('status', $status)
            ->get();

        return response()->json($drivers);
    }
}