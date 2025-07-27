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
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('id_card_number')->unique();
            $table->enum('conduct_grade', ['E', 'S', 'N', 'U'])->default('E');
            $table->foreignId('group_id')->constrained('groups')->onDelete('cascade')->nullable();
            $table->foreignId('generation_id')->constrained('generations')->onDelete(action: 'cascade');
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
