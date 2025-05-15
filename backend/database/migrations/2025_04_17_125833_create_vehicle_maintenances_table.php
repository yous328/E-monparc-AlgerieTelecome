<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('vehicle_maintenances', function (Blueprint $table) {
            $table->id('maintenanceID');
            $table->foreignId('vehicleID')->constrained('vehicles', 'vehicleID')->onDelete('cascade');
            $table->foreignId('maintenanceTypeID')->constrained('maintenance_types', 'maintenanceTypeID')->onDelete('cascade');

            $table->integer('kilometrage')->nullable();
            $table->date('date')->nullable();
            $table->integer('interval_km')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicle_maintenances');
    }
};
