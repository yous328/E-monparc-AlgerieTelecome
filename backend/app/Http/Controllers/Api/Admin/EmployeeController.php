<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\Employee;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    public function index() {
        return Employee::with('user')->get();
    }    
}
