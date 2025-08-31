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
        Schema::table('students', function (Blueprint $table) {
            // Drop foreign key first
            $table->dropForeign(['generation_id']);
            // Then drop the column
            $table->dropColumn('generation_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('students', function (Blueprint $table) {
            $table->unsignedBigInteger('generation_id')->nullable()->default(null);
            $table->foreign('generation_id')->references('generation_id')->on('generations')->onDelete('cascade');
        });
    }
};
