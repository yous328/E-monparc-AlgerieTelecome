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
        Schema::create('vehicle_technical_statuses', function (Blueprint $table) {
            $table->id('vehicle_technical_id');

            // Links this technical status to a vehicle
            $table->foreignId('vehicleID')
                ->constrained('vehicles', 'vehicleID')
                ->onDelete('cascade');

            // Technical components (optional fields, allow nulls)
            $table->integer('vidange_km')->nullable();
            $table->integer('batterie_km')->nullable();
            $table->integer('bougies_km')->nullable();
            $table->integer('gaz_clim_km')->nullable();
            $table->integer('chaine_km')->nullable();
            $table->integer('panneaux_km')->nullable();
            $table->integer('plaquettes_frein_km')->nullable();
            $table->integer('filtres_km')->nullable();

            // Timestamps: created_at, updated_at
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('vehicle_technical_statuses', function (Blueprint $table) {
            $table->dropForeign(['vehicleID']);
        });

        Schema::dropIfExists('vehicle_technical_statuses');
    }
};
