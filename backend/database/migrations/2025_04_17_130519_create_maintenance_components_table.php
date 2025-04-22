<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('maintenance_components', function (Blueprint $table) {
            $table->id('componentID');
            
            // Explicitly reference custom primary keys
            $table->foreignId('maintenanceID')->constrained('vehicle_maintenances', 'maintenanceID')->onDelete('cascade');
            $table->foreignId('typeID')->constrained('maintenance_types', 'maintenanceTypeID')->onDelete('cascade');
        
            $table->date('inspection_date');
            $table->boolean('replaced')->default(false);
            $table->integer('next_due_km')->nullable();
            $table->enum('status', ['ok', 'to_replace', 'replaced'])->default('ok');
            $table->text('notes')->nullable();
        
            $table->timestamps();
        });        
    }

    public function down(): void {
        Schema::dropIfExists('maintenance_components');
    }
};