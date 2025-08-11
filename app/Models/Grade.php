<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Grade extends Model
{
    use HasFactory;

    // Table name
    protected $table = 'grades';

    // Primary key
    protected $primaryKey = 'grade_id';

    // Auto-incrementing primary key
    public $incrementing = true;

    // Primary key type
    protected $keyType = 'int';

    // Mass assignable fields
    protected $fillable = [
        'student_id',
        'professor_subject_id',
        'grade',
        'date',
    ];

    /**
     * Relationships
     */

    public function student()
    {
        return $this->belongsTo(Student::class, 'student_id', 'student_id');
    }

    public function professorSubject()
    {
        return $this->belongsTo(Professor_subject::class, 'professor_subject_id', 'professor_subject_id');
    }
}
