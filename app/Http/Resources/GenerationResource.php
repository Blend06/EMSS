<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GenerationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'generation_id' => $this->generation_id,
            'generation' => $this->generation,
            'updated_at' => $this->updated_at,
            'created_at' => $this->created_at,
        ];
    }
}
