<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GroupResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'group_id' => $this->group_id,
            'group' => $this->group,
            'semester_id' => $this->semester_id,
            'semester' => $this->semester?->semester, 
            'updated_at' => $this->updated_at,
            'created_at' => $this->created_at,
        ];
    }
}
