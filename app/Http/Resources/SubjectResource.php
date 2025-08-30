<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SubjectResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'subject_id' => $this->subject_id,
            'name' => $this->name,
            'created_at'   => $this->created_at,
            'updated_at'   => $this->updated_at,
            'semester_id'=> $this->semester_id,
            'semester'   => $this->semester?->semester,
            'year_id'     => $this->semester?->year?->year_id,
            'year'        => $this->semester?->year?->academic_year,
        ];
    }
}
