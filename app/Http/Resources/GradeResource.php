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
            'professor_subject_id' => $this->professor_subject_id,
            'grade' => $this->grade,
            'date' => $this->date ? $this->date->toDateString() : null,

            'student' => $this->whenLoaded('student', function () {
                return [
                    'id' => $this->student->student_id,
                    'firstname' => $this->student->user->firstname ?? null, 
                ];
            }),

            'professorSubject' => $this->whenLoaded('professorSubject', function () {
                return [
                    'id' => $this->professorSubject->professor_subject_id,
                    'professor' => [
                        'id' => $this->professorSubject->professor->professor_id ?? null,
                        'firstname' => $this->professorSubject->professor->firstname ?? null,
                    ],
                    'subject' => [
                        'id' => $this->professorSubject->subject->subject_id ?? null,
                        'name' => $this->professorSubject->subject->name ?? null,
                    ],
                ];
            }),
        ];
    }
}
