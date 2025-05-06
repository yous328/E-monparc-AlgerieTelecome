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

            // Maintenance Items
            $table->integer('oil_km')->nullable();
            $table->date('oil_date')->nullable();
            $table->integer('oil_interval')->nullable();

            $table->integer('battery_km')->nullable();
            $table->date('battery_date')->nullable();
            $table->integer('battery_interval')->nullable();

            $table->integer('spark_plugs_km')->nullable();
            $table->date('spark_plugs_date')->nullable();
            $table->integer('spark_plugs_interval')->nullable();

            $table->integer('tires_km')->nullable();
            $table->date('tires_date')->nullable();
            $table->integer('tires_interval')->nullable();

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
