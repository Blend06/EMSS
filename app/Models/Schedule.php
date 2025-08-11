<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    use HasFactory;

    // Table name
    protected $table = 'schedules';

    // Primary key
    protected $primaryKey = 'schedule_id';

    // Auto-incrementing primary key
    public $incrementing = true;

    // Primary key type
    protected $keyType = 'int';

    // Mass assignable attributes
    protected $fillable = [
        'time',
        'day',
        'group_id',
        'class_id',
        'professor_subject_id',
    ];

    /**
     * Relationships
     */

    public function group()
    {
        return $this->belongsTo(Group::class, 'group_id', 'group_id');
    }

    public function schoolClass()
    {
        return $this->belongsTo(Classes::class, 'class_id', 'class_id');
    }

    public function professorSubject()
    {
        return $this->belongsTo(Professor_subject::class, 'professor_subject_id', 'professor_subject_id');
    }
}
