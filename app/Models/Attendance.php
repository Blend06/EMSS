<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    use HasFactory;

    // Table name
    protected $table = 'attendances';

    // Primary key
    protected $primaryKey = 'attendance_id';

    // Auto-incrementing primary key
    public $incrementing = true;

    // Primary key type
    protected $keyType = 'int';

    // Mass assignable attributes
    protected $fillable = [
        'student_id',
        'absences',
        'professor_subject_id',
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
