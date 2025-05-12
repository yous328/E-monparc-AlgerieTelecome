<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('vehicles', function (Blueprint $table) {
            $table->id('vehicleID');
            $table->string('registration_number')->unique();

            $table->foreignId('brandID')->constrained('vehicle_brands', 'brandID')->onDelete('cascade');
            $table->foreignId('modelID')->nullable()->constrained('vehicle_models', 'modelID')->onDelete('set null'); // Add this line safely

            $table->foreignId('vehicleTypeID')->constrained('vehicle_types', 'vehicleTypeID')->onDelete('cascade');
            $table->foreignId('engineTypeID')->constrained('engine_types', 'engineTypeID')->onDelete('cascade');
            $table->foreignId('fuelTypeID')->constrained('fuel_types', 'fuelTypeID')->onDelete('cascade');
            $table->foreignId('colorID')->constrained('colors', 'colorID')->onDelete('cascade');

            $table->enum('status', ['Available', 'OnMission', 'UnderMaintenance', 'InBreakdown', 'Unavailable'])->default('Available');
            $table->foreignId('serviceID')->constrained('services', 'serviceID')->onDelete('cascade');

            $table->integer('mileage');
            $table->decimal('fuel_level')->nullable();
            $table->decimal('average_consumption')->nullable();
            $table->decimal('current_consumption')->nullable();
            $table->decimal('cost_per_km')->nullable();
            $table->decimal('daily_cost')->nullable();

            $table->foreignId('vehicleInsuranceID')->nullable()->constrained('vehicle_insurances', 'vehicleInsuranceID')->onDelete('set null');
            $table->foreignId('technicalControlID')->nullable()->constrained('technical_controls', 'technicalControlID')->onDelete('set null');

            $table->date('last_maintenance_date')->nullable();
            $table->date('next_available_date')->nullable();
            $table->string('photo')->nullable();

            $table->json('monthly_kilometrage')->nullable();
            $table->json('mission_stats')->nullable();
            $table->json('consumption')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('vehicles');
    }
};
