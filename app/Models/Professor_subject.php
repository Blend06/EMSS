<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Professor_subject extends Model
{
    use HasFactory;

    // Table name
    protected $table = 'professors_subjects';

    // Primary key
    protected $primaryKey = 'professor_subject_id';

    // Auto-incrementing key
    public $incrementing = true;

    // Key type
    protected $keyType = 'int';

    // Mass assignable attributes
    protected $fillable = [
        'professor_id',
        'subject_id',
    ];

    public function professor()
    {
        return $this->belongsTo(Professor::class, 'professor_id', 'professor_id');
    }

    public function subject()
    {
        return $this->belongsTo(Subject::class, 'subject_id', 'subject_id');
    }
    public function lectures()
{
    return $this->hasMany(Lecture::class, 'professor_subject_id', 'professor_subject_id');
}
}
