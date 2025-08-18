<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

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
            'semester' => [
                'required',
                'string',
                'max:255',
                Rule::unique('semester', 'semester')->ignore($semesterId, 'semester_id'),
            ],
            'year_id' => [
                'required',
                'exists:years,year_id',
            ],
        ];
    }
}
