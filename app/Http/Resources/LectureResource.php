<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LectureResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'lecture_id'   => $this->lecture_id,
            'title'        => $this->title,
            'file_path'    => $this->file_path,
            'professor_subject_id' => $this->professor_subject_id,
            'created_at'   => $this->created_at,
            'updated_at'   => $this->updated_at,

            // Load nested relations when available
            'professor_subject' => $this->whenLoaded('professorSubject', function () {
                return [
                    'professor_subject_id' => $this->professorSubject->professor_subject_id,
                    'subject' => $this->professorSubject->subject ? [
                        'id'   => $this->professorSubject->subject->subject_id,
                        'name' => $this->professorSubject->subject->name,
                    ] : null,
                    'professor' => $this->professorSubject->professor ? [
                        'id'        => $this->professorSubject->professor->professor_id,
                        'firstname' => $this->professorSubject->professor->user->firstname ?? null,
                        'lastname'  => $this->professorSubject->professor->user->lastname ?? null,
                    ] : null,
                ];
            }),
        ];
    }
}
