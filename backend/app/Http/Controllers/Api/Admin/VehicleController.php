<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\Vehicle;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class VehicleController extends Controller
{
    public function index() {
        return Vehicle::with('brand', 'engineType')->get();
    }
    
}
