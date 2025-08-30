<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProfessorResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'professor_id' => $this->professor_id,
            'professor_subject_id' => $this->pivot->professor_subject_id ?? null,
            'user_id'      => $this->user_id,
            'user'         => [
                'id'    => $this->user->id,
                'firstname'  => $this->user->firstname,
                'lastname'  => $this->user->lastname,
                'email' => $this->user->email,
            ],
            'created_at'   => $this->created_at,
            'updated_at'   => $this->updated_at,
        ];
    }
}
