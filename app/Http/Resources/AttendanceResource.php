<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AttendanceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'attendance_id' => $this->attendance_id,
            
            // Student details
            'student_id' => $this->student_id,
            'student' => $this->whenLoaded('student', function () {
                return [
                    'student_id' => $this->student->student_id,
                    'firstname'  => $this->student->user?->firstname,
                    'lastname'   => $this->student->user?->lastname,
                ];
            }),
            'absences' => $this->absences,
            // Professor + Subject details
            'professor_subject_id' => $this->professor_subject_id,
            'professor_subject' => $this->whenLoaded('professorSubject', function () {
                return [
                    'professor_subject_id' => $this->professorSubject->professor_subject_id,
                    'professor_firstname'  => $this->professorSubject->professor?->user?->firstname,
                    'professor_lastname'   => $this->professorSubject->professor?->user?->lastname,
                    'subject_name'         => $this->professorSubject->subject?->name,
                ];
            }),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
