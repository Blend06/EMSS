<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Generation extends Model
{
    use HasFactory;

    protected $table = 'generations';

    // Primary key
    protected $primaryKey = 'generation_id';

    // Auto-incrementing ID
    public $incrementing = true;

    // ID type
    protected $keyType = 'int';

    // Mass-assignable fields
    protected $fillable = [
        'generation',
    ];
}
