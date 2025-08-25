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
             $table->dropForeign(['generation_id']);
            $table->dropForeign(['group_id']);

            // Alter the columns to nullable
            $table->unsignedBigInteger('generation_id')->nullable()->default(null)->change();
            $table->unsignedBigInteger('group_id')->nullable()->default(null)->change();

            // Re-add the foreign keys
            $table->foreign('generation_id')->references('generation_id')->on('generations')->onDelete('cascade');
            $table->foreign('group_id')->references('group_id')->on('groups')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('students', function (Blueprint $table) {
             $table->dropForeign(['generation_id']);
            $table->dropForeign(['group_id']);

            // Restore them as NOT NULL
            $table->unsignedBigInteger('generation_id')->nullable(false)->change();
            $table->unsignedBigInteger('group_id')->nullable(false)->change();

            $table->foreign('generation_id')->references('generation_id')->on('generations')->onDelete('cascade');
            $table->foreign('group_id')->references('group_id')->on('groups')->onDelete('cascade');
        });
    }
};
