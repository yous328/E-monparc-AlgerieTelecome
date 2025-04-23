<?php

namespace App\Http\Controllers\Api\Admin\Accounts;

use App\Http\Controllers\Controller;
use App\Models\Driver;
use App\Models\LicenseType;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DriverController extends Controller
{
    // List all drivers
    public function index()
    {
        return Driver::with(['user', 'licenseType'])->get();
    }

    // Create a new driver (user + driver)
    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'birth_date' => 'nullable|date',
            'phone_number' => 'nullable|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'licenseTypeID' => 'required|exists:license_types,licenseTypeID',
            'license_number' => 'required|string',
            'licenseTypeID' => 'required|exists:license_types,licenseTypeID',
            'status' => 'required|in:Available,On Mission,Resting,Unavailable',
            'description' => 'nullable|string',
            'profile_image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('profile_image')) {
            $path = $request->file('profile_image')->store('drivers', 'public');
            $validated['profile_image'] = $path;
        }

        $user = User::create([
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'birth_date' => $validated['birth_date'] ?? null,
            'phone_number' => $validated['phone_number'] ?? null,
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => 'Driver',
            'description' => $validated['description'] ?? null,
            'profile_image' => $validated['profile_image'] ?? null,
        ]);
        
        // Make sure $user is not null or failed
        if (!$user || !$user->id) {
            return response()->json(['error' => 'User creation failed'], 500);
        }
        
        $driver = Driver::create([
            'userID' => $user->id, // This must be a real ID
            'license_number' => $validated['license_number'],
            'licenseTypeID' => $validated['licenseTypeID'],
            'licenseTypeID' => $validated['licenseTypeID'],
            'status' => $validated['status'],
        ]);

        return response()->json(['message' => 'Driver created successfully', 'driver' => $driver], 201);
    }

    // View one driver
    public function show($id)
    {
        return Driver::with(['user', 'licenseType'])->findOrFail($id);
    }

    // Update driver & user info
    public function update(Request $request, $id)
    {
        $driver = Driver::with('user')->findOrFail($id);

        $validated = $request->validate([
            'first_name' => 'sometimes|string|max:100',
            'last_name' => 'sometimes|string|max:100',
            'birth_date' => 'nullable|date',
            'phone_number' => 'nullable|string',
            'email' => 'sometimes|email|unique:users,email,' . $driver->user->id,
            'licenseTypeID' => 'sometimes|exists:license_types,licenseTypeID',
            'license_number' => 'sometimes|string',
            'status' => 'sometimes|in:Available,On Mission,Resting,Unavailable',
            'description' => 'nullable|string',
            'profile_image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('profile_image')) {
            $path = $request->file('profile_image')->store('drivers', 'public');
            $validated['profile_image'] = $path;
        }

        $driver->user->update($validated);
        $driver->update($validated);

        return response()->json(['message' => 'Driver updated successfully']);
    }

    // Delete driver
    public function destroy($id)
    {
        $driver = Driver::findOrFail($id);
        $driver->delete();

        return response()->json(['message' => 'Driver deleted successfully']);
    }
}
