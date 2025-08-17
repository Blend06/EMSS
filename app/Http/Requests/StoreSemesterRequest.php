<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSemesterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // allow request (change if you use policies)
    }

    public function rules(): array
    {
        return [
            'semester' => 'required|string|unique:semester,semester|max:255',
            'year_id' => 'required|exists:years,year_id',
        ];
    }
}
