<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Subject extends Model
{
    use HasFactory;

    // Table name (optional if it matches the plural of the model name)
    protected $table = 'subjects';

    // Primary key
    protected $primaryKey = 'subject_id';

    // Auto-incrementing ID
    public $incrementing = true;

    // ID type
    protected $keyType = 'int';

    // Mass-assignable fields
    protected $fillable = [
        'name',
        'syllabus_file_path',
    ];
}
