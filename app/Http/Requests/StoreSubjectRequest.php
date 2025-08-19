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
            'syllabus_file_path' => 'required|string|max:255',
        ];
    }
}
