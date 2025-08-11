<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Group extends Model
{
    use HasFactory;

    protected $table = 'groups';

    // Primary key
    protected $primaryKey = 'group_id';

    // Auto-incrementing ID
    public $incrementing = true;

    // ID type
    protected $keyType = 'int';

    // Mass-assignable fields
    protected $fillable = [
        'group',
        'semester_id',
    ];


    public function semester()
    {
        return $this->belongsTo(Semester::class, 'semester_id', 'semester_id');
    }
}
