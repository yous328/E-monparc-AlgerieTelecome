<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('mission_types', function (Blueprint $table) {
            $table->id('missionTypeID');
            $table->enum('category', ['Internal', 'External']);
            $table->enum('complexity', ['Heavy', 'Light']);           
            $table->timestamps();
        });
        
    }

    public function down(): void {
        Schema::dropIfExists('mission_types');
    }
};