<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GradeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'grade_id' => $this->grade_id,
            'student_id' => $this->student_id,
            'grade' => $this->grade,
            'date' => $this->date ? $this->date->toDateString() : null,

            'student' => $this->whenLoaded('student', function () {
                return [
                    'id' => $this->student->student_id,
                    'firstname' => $this->student->user->firstname ?? null, 
                ];
            }),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,

            'professor_subject_id' => $this->professor_subject_id,
            'professor_subject' => $this->whenLoaded('professorSubject', function () {
                return [
                    'professor_subject_id' => $this->professorSubject->professor_subject_id,
                    'professor_firstname'  => $this->professorSubject->professor?->user?->firstname,
                    'professor_lastname'   => $this->professorSubject->professor?->user?->lastname,
                    'subject_name'         => $this->professorSubject->subject?->name,
                ];
            }),
        ];
    }
}
