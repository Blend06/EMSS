<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Professor extends Model
{
    use HasFactory;

    // Table name (optional if it matches the plural of the model name)
    protected $table = 'professors';

    // Primary key
    protected $primaryKey = 'professor_id';

    // Auto-incrementing ID
    public $incrementing = true;

    // ID type
    protected $keyType = 'int';

    // Mass-assignable fields
    protected $fillable = [
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
