<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index() {
        return User::all();
    }    
}
