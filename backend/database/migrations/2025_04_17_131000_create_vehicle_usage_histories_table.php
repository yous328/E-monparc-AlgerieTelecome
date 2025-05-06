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
        Schema::create('vehicle_usage_histories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('vehicleID')->constrained('vehicles', 'vehicleID')->onDelete('cascade');
        
            $table->string('driver_name');
            $table->string('driver_phone');
            $table->date('usage_date');
            $table->string('route');
            $table->decimal('distance_km');
            $table->decimal('average_speed');
        
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicle_usage_history');
    }
};
