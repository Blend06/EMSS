<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ScheduleResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'schedule_id' => $this->schedule_id,

            // Group details
            'group_id' => $this->group_id,
            'group' => $this->whenLoaded('group', function () {
                return [
                    'group_id' => $this->group->group_id,
                    'group'    => $this->group->group,
                ];
            }),

            // Class details
            'class_id' => $this->class_id,
            'class' => $this->whenLoaded('classes', function () {
                return [
                    'class_id' => $this->classes->class_id,
                    'name'     => $this->classes->name,
                ];
            }),

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

            'time' => $this->time,
            'day'  => $this->day,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
