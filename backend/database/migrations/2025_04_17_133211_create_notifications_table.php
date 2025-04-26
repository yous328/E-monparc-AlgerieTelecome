<?php

// Migration: create_notifications_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('notifications', function (Blueprint $table) {
            $table->id('notificationID');
            $table->string('title');
            $table->text('message');
            $table->enum('type', ['Info', 'Warning', 'Error', 'Maintenance', 'Breakdown', 'Message'])->default('Info');
            $table->unsignedBigInteger('relatedID')->nullable();
            $table->string('related_type')->nullable();
            $table->foreignId('created_by')->constrained('users', 'id')->onDelete('cascade');
            $table->enum('status', ['unread', 'read'])->default('unread');
            $table->timestamp('read_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('notifications');
    }
};
