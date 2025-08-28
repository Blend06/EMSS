<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class StudentResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'student_id' => $this->student_id,
            'user_id' => $this->user_id,
            'user'         => [
                'id'    => $this->user->id,
                'firstname'  => $this->user->firstname,
                'lastname'  => $this->user->lastname,
                'email' => $this->user->email,
            ],
            'conduct_grade' => $this->conduct_grade,
            'id_card_number' => $this->id_card_number,
            'status' => $this->status,
            'caretaker_name' => $this->caretaker_name,
            'caretaker_phone' => $this->caretaker_phone,
            'group' => $this->group ? [
                'id' => $this->group->id,
                'group' => $this->group->group
            ] : null,
            'generation' => $this->generation ? [
                'id' => $this->generation->id,
                'generation' => $this->generation->generation
            ] : null,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
