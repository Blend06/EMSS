<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Semester extends Model
{
    use HasFactory;

    // Table name (optional if it matches the plural of the model name)
    protected $table = 'semester';

    // Primary key
    protected $primaryKey = 'semester_id';

    // Auto-incrementing ID
    public $incrementing = true;

    // ID type
    protected $keyType = 'int';

    // Mass-assignable fields
    protected $fillable = [
        'semester',
        'year_id',

    ];

    public function year()
    {
        return $this->belongsTo(Year::class, 'year_id', 'year_id');
    }
}
