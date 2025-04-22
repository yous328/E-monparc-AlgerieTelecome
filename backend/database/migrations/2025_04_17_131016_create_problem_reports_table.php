<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('problem_reports', function (Blueprint $table) {
            $table->id('problemID');
    
            // Corrected foreign keys (match custom primary keys)
            $table->foreignId('reported_by')->constrained('users', 'id')->onDelete('cascade'); // Users uses default 'id'
            $table->foreignId('vehicleID')->nullable()->constrained('vehicles', 'vehicleID')->onDelete('set null');
            $table->foreignId('missionID')->nullable()->constrained('missions', 'missionID')->onDelete('set null');
            $table->foreignId('maintenanceID')->nullable()->constrained('vehicle_maintenances', 'maintenanceID')->onDelete('set null');
            $table->foreignId('problem_type_id')->nullable()->constrained('problem_types', 'problemTypeID')->onDelete('set null');
    
            // Problem details (unchanged)
            $table->text('description');
            $table->enum('status', ['pending', 'in_progress', 'resolved'])->default('pending');
            $table->string('image_path')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('problem_reports');
    }
};
