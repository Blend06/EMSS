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
        Schema::create('grades', function (Blueprint $table) {
            $table->id('grade_id');
            $table->unsignedBigInteger('student_id');
            $table->foreign('student_id')->references('student_id')->on('students')->onDelete('cascade');
            $table->unsignedBigInteger('professor_subject_id');
            $table->foreign('professor_subject_id')->references('professor_subject_id')->on('professors_subjects')->onDelete('cascade');
            $table->decimal('grade', 3, 2)->check('grade >= 1.00 AND grade <= 5.00');
            #$table->enum('grade', ['1', '2', '3', '4', '5']); MUJNA EDHE QESHTU QYSH DONI
            $table->date('date')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('grades');
    }
};
