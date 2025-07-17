<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Student extends Model
{
    use HasFactory;

    protected $primaryKey = 'student_id';
    
    protected $fillable = [
        'user_id',
        'id_card_number',
        'conduct_grade',
        'caretaker_name',
        'caretaker_phone',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }
}
