<?php

namespace App\Http\Controllers\Api\Admin\Employees;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\JsonResponse;

class EmployeeController extends Controller
{
    // List all employees
    public function index(): JsonResponse
    {
        $employees = Employee::with('user')->get();

        return response()->json($employees);
    }

    // Store a new employee (create user + employee)
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'birth_date' => 'nullable|date',
            'address' => 'nullable|string|max:255',
            'phone_number' => 'nullable|string|max:20',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'description' => 'nullable|string',
            'profile_image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('profile_image')) {
            $path = $request->file('profile_image')->store('employees', 'public');
            $validated['profile_image'] = $path;
        }

        // 1. Create user
        $user = User::create([
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'birth_date' => $validated['birth_date'] ?? null,
            'address' => $validated['address'] ?? null,
            'phone_number' => $validated['phone_number'] ?? null,
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => 'Employee',
            'description' => $validated['description'] ?? null,
            'profile_image' => $validated['profile_image'] ?? null,
        ]);

        // 2. Create employee
        $employee = Employee::create([
            'userID' => $user->id
        ]);

        return response()->json([
            'message' => 'Employee created successfully',
            'employee' => $employee
        ], 201);
    }

    // Show one employee
    public function show($id): JsonResponse
    {
        $employee = Employee::with('user')->findOrFail($id);
        return response()->json($employee);
    }

    // Update employee & user
    public function update(Request $request, $id): JsonResponse
    {
        $employee = Employee::with('user')->findOrFail($id);

        $validated = $request->validate([
            'first_name' => 'sometimes|string|max:100',
            'last_name' => 'sometimes|string|max:100',
            'birth_date' => 'nullable|date',
            'address' => 'nullable|string|max:255',
            'phone_number' => 'nullable|string|max:20',
            'email' => 'sometimes|email|unique:users,email,' . $employee->user->id,
            'description' => 'nullable|string',
            'profile_image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('profile_image')) {
            $path = $request->file('profile_image')->store('employees', 'public');
            $validated['profile_image'] = $path;
        }

        $employee->user->update($validated);
        $employee->save();

        return response()->json(['message' => 'Employee updated successfully']);
    }

    // Delete employee
    public function destroy($id): JsonResponse
    {
        $employee = Employee::findOrFail($id);
        $employee->delete();

        return response()->json(['message' => 'Employee deleted successfully']);
    }
}
