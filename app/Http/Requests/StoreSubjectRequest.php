<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSubjectRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // allow all authenticated users for now
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255|unique:subjects,name',
            'semester_id' => 'required|exists:semester,semester_id',
        ];
    }
}
