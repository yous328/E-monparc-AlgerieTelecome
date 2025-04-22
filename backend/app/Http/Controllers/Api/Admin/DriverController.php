<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\Driver;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DriverController extends Controller
{
    public function index() {
        return Driver::with('user')->get();
    }
    
}
