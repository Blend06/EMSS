<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSemesterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $semesterId = $this->route('semester')->semester_id ?? null;

        return [
            'semester' => 'sometimes|string|unique:semester,semester,' . $semesterId . ',semester_id|max:255',
            'year_id' => 'sometimes|exists:years,year_id',
        ];
    }
}
