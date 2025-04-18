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
        Schema::create('driver_rests', function (Blueprint $table) {
            $table->id('restID');
            $table->foreignId('driverID')->constrained('drivers', 'driverID')->onDelete('cascade');
            $table->date('start_date');
            $table->date('end_date');
            $table->enum('source', ['manual', 'auto']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('driver_rests');
    }
};
