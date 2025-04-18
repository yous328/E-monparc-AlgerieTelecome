<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('missions', function (Blueprint $table) {
            $table->id('missionID');
            
            // Explicitly specify custom primary keys for all foreign keys
            $table->foreignId('vehicleID')->constrained('vehicles', 'vehicleID')->onDelete('cascade');
            $table->foreignId('driverID')->constrained('drivers', 'driverID')->onDelete('cascade');
            $table->foreignId('accompanyingEmployeeID')->nullable()->constrained('employees', 'employeeID')->onDelete('set null');
            $table->foreignId('missionTypeID')->constrained('mission_types', 'missionTypeID')->onDelete('cascade');
            
            $table->enum('complexity', ['simple', 'medium', 'complex'])->nullable();
            $table->date('estimated_end_date')->nullable();
        
            $table->string('departure_location');
            $table->string('destination');
            $table->date('mission_date');
            $table->time('mission_time');
            $table->foreignId('missionObjectiveID')->constrained('mission_objectives', 'missionObjectiveID')->onDelete('cascade');
            $table->text('description')->nullable();
            $table->foreignId('created_by')->constrained('users', 'id')->onDelete('cascade'); // Users table uses default 'id'
        
            $table->enum('status', ['pending', 'in_progress', 'completed', 'cancelled'])->default('pending');
        
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('missions');
    }
};