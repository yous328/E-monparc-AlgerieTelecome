<?php

namespace App\Http\Controllers\Api\Admin\Drivers\Filters;

use App\Http\Controllers\Controller;
use App\Models\Driver;
use Illuminate\Http\Request;

class DriverLicenseTypeFilterController extends Controller
{
    public function index(Request $request)
    {
        $licenseTypeId = $request->input('license_type_id');

        $drivers = Driver::with(['user', 'licenseType'])
            ->where('licenseTypeID', $licenseTypeId)
            ->get();

        return response()->json($drivers);
    }
}
