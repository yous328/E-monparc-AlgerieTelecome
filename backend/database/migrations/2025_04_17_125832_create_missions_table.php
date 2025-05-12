<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('missions', function (Blueprint $table) {
            $table->id('missionID');
        
            $table->foreignId('vehicleID')->constrained('vehicles', 'vehicleID')->onDelete('cascade');
            $table->foreignId('driverID')->constrained('drivers', 'driverID')->onDelete('cascade');
            $table->foreignId('accompanyingEmployeeID')->nullable()->constrained('employees', 'employeeID')->onDelete('set null');
            $table->foreignId('missionTypeID')->constrained('mission_types', 'missionTypeID')->onDelete('cascade');
            
            $table->date('estimated_end_date')->nullable();
            $table->string('departure_location');
            $table->string('destination');
            $table->date('mission_date');
            $table->time('mission_time');
            $table->decimal('distance_km', 8, 2)->nullable();
            $table->foreignId('missionObjectiveID')->constrained('mission_objectives', 'missionObjectiveID')->onDelete('cascade');
            $table->text('description')->nullable();
            $table->foreignId('created_by')->constrained('users', 'id')->onDelete('cascade');
            $table->enum('status', ['pending', 'in_progress', 'completed', 'canceled', 'not_started_yet'])->default('pending');
        
            $table->timestamps();
        });
        
    }

    public function down(): void {
        Schema::dropIfExists('missions');
    }
};
