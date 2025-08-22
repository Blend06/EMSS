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
            'date' => $this->date,

        ];
    }
}
