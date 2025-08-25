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
        Schema::create('students', function (Blueprint $table) {
            $table->id('student_id');
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->string('id_card_number')->unique();
            $table->enum('conduct_grade', ['E', 'S', 'N', 'U'])->default('E');
            $table->unsignedBigInteger('group_id')->nullable();
            $table->foreign('group_id')->references('group_id')->on('groups')->onDelete('cascade');
            $table->unsignedBigInteger('generation_id')->nullable()->default(null);
            $table->foreign('generation_id')->references('generation_id')->on('generations')->onDelete('cascade');
            $table->string('caretaker_name');
            $table->string('caretaker_phone');
            $table->timestamps();
        });
    }
        #MODELIN ME MODIFY NAPP/MODELS 
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
