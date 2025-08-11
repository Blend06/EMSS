<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Classes extends Model
{
    use HasFactory;

    // Table name
    protected $table = 'classes';

    // Primary key
    protected $primaryKey = 'class_id';

    // Auto-incrementing primary key
    public $incrementing = true;

    // Key type
    protected $keyType = 'int';

    // Mass assignable fields
    protected $fillable = [
        'name',
    ];

    

    
}
