<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StudentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'student_id' => $this->student_id,
            'user_id'      => $this->user_id,
            'id_card_number' => $this->id_card_number,
            'conduct_grade' => $this->conduct_grade,
            'academic_year' => $this->academic_year,
            'group_id' => $this->group_id,
            'generation_id' => $this->generation_id,
            'caretaker_name' => $this->caretaker_name,
            'caretaker_phone' => $this->caretaker_phone,
            'user'         => [
                'id'    => $this->user->id,
                'firstname'  => $this->user->firstname,
                'email' => $this->user->email,
            ],
            'created_at'   => $this->created_at,
            'updated_at'   => $this->updated_at,
        ];
    }
}
