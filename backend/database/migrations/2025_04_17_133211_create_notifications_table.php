<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('notifications', function (Blueprint $table) {
            $table->id('notificationID');

            // Who will receive it
            $table->foreignId('userID')->constrained('users')->onDelete('cascade');

            // Optional linked resources
            $table->foreignId('vehicleID')->nullable()->constrained('vehicles', 'vehicleID')->onDelete('set null');
            $table->foreignId('missionID')->nullable()->constrained('missions', 'missionID')->onDelete('set null');
            $table->foreignId('problemID')->nullable()->constrained('problem_reports', 'problemID')->onDelete('set null');
            $table->foreignId('maintenanceID')->nullable()->constrained('vehicle_maintenances', 'maintenanceID')->onDelete('set null');

            // Notification data
            $table->string('title');
            $table->text('message')->nullable();
            $table->enum('type', ['problem', 'mission', 'reminder', 'maintenance', 'info']);
            $table->enum('status', ['unread', 'read', 'archived'])->default('unread');

            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('notifications');
    }
};