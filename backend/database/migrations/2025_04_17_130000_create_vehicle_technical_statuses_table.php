<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('vehicle_technical_statuses', function (Blueprint $table) {
            $table->id('statusID');
            $table->foreignId('vehicleID')->constrained('vehicles', 'vehicleID')->onDelete('cascade');

            $table->integer('vidange_done_at')->nullable();
            $table->integer('vidange_next_due')->nullable();

            $table->integer('batterie_done_at')->nullable();
            $table->integer('batterie_next_due')->nullable();

            $table->integer('bougies_done_at')->nullable();
            $table->integer('bougies_next_due')->nullable();

            $table->integer('gaz_clim_done_at')->nullable();
            $table->integer('gaz_clim_next_due')->nullable();

            $table->integer('chaine_done_at')->nullable();
            $table->integer('chaine_next_due')->nullable();

            $table->integer('pneus_done_at')->nullable();
            $table->integer('pneus_next_due')->nullable();

            $table->integer('filtres_done_at')->nullable();
            $table->integer('filtres_next_due')->nullable();

            $table->integer('plaquettes_frein_done_at')->nullable();
            $table->integer('plaquettes_frein_next_due')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('vehicle_technical_statuses');
    }
};
