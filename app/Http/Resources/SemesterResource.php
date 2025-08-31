<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SemesterResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'semester_id' => $this->semester_id,
            'semester' => $this->semester,
            'year_id' => $this->year_id,
            'year'         => [
                'academic_year'  => $this->year?->academic_year,   
           ],
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'subjects' => $this->whenLoaded('subjects', fn() => SubjectResource::collection($this->subjects)),
        ];
    }
}
