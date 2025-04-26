<?php

namespace Database\Seeders;

use App\Models\Notification;
use App\Models\User;
use App\Models\Vehicle;
use App\Models\Mission;
use App\Models\Driver;
use Illuminate\Database\Seeder;

class NotificationSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::where('role', 'Admin')->inRandomOrder()->first();

        if (!$admin) {
            return; // If no Admin found, don't proceed.
        }

        // Vehicle-related notification
        $vehicle = Vehicle::inRandomOrder()->first();
        if ($vehicle) {
            Notification::create([
                'title' => 'Vehicle Maintenance Due',
                'message' => "The vehicle {$vehicle->registration_number} is due for maintenance.",
                'status' => 'unread',
                'related_type' => Vehicle::class,
                'relatedID' => $vehicle->vehicleID,
                'created_by' => $admin->id, // Always the Admin who seeded
            ]);
        }

        // Mission-related notification
        $mission = Mission::inRandomOrder()->first();
        if ($mission) {
            Notification::create([
                'title' => 'New Mission Assigned',
                'message' => "You’ve been assigned a new mission to {$mission->destination}.",
                'status' => 'unread',
                'related_type' => Mission::class,
                'relatedID' => $mission->missionID,
                'created_by' => $admin->id,
            ]);
        }

        // Driver-related notification
        $driverModel = Driver::inRandomOrder()->first();
        if ($driverModel) {
            Notification::create([
                'title' => 'Driver Status Updated',
                'message' => "Driver #{$driverModel->driverID} status changed to {$driverModel->status}.",
                'status' => 'unread',
                'related_type' => Driver::class,
                'relatedID' => $driverModel->driverID,
                'created_by' => $admin->id,
            ]);
        }
    }
}
