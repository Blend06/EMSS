<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class Professor_subjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
         return [
            'professor_subject_id' => $this->professor_subject_id,
            'professor_id'        => $this->professor_id,
            'subject_id'          => $this->subject_id,

            // Safely access professor's user
            'professor_firstname' => $this->professor && $this->professor->user
                ? $this->professor->user->firstname
                : null,
            'professor_lastname'  => $this->professor && $this->professor->user
                ? $this->professor->user->lastname
                : null,

            // Safely access subject name
            'subject_name' => $this->subject ? $this->subject->name : null,

            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
