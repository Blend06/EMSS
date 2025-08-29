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
        Schema::table('subjects', function (Blueprint $table) {
            $table->dropColumn('syllabus_file_path');
            $table->foreignId('semester_id')->constrained('semester', 'semester_id')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('subjects', function (Blueprint $table) {
            $table->string('syllabus_file_path')->nullable();
            $table->dropForeign(['semester_id']);
            $table->dropColumn('semester_id');
        });
    }
};
