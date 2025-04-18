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
        Schema::create('vehicle_maintenance', function (Blueprint $table) {
            $table->id('maintenanceID');
            $table->foreignId('vehicleID')->constrained('vehicles', 'vehicleID')->onDelete('cascade');
            $table->date('service_date');
            $table->integer('mileage_at_service');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicle_maintenance');
    }
};
