<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lecture extends Model
{
    use HasFactory;

    // Table name
    protected $table = 'lectures';

    // Primary key
    protected $primaryKey = 'lecture_id';

    // Auto-incrementing
    public $incrementing = true;

    // Primary key type
    protected $keyType = 'int';

    // Mass assignable fields
    protected $fillable = [
        'title',
        'file_path',
        'professor_subject_id',
    ];

    /**
     * Relationships
     */

    public function professorSubject()
    {
        return $this->belongsTo(Professor_subject::class, 'professor_subject_id', 'professor_subject_id');
    }
}
